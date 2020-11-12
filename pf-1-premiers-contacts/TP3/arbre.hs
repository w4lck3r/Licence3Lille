import Test.QuickCheck
import Control.Concurrent (threadDelay)
import Data.List

-- Question 1 --
data Arbre coul val = Feuille
                    | Noeud  {couleur :: coul,
                              valeur:: val,
                              fg :: (Arbre coul val),
                              fd :: (Arbre coul val)}
                    deriving (Show, Eq)



-- Question 2 --
mapArbre :: (a->a) -> (b->b) -> (Arbre a b) -> (Arbre a b)
mapArbre _ _ Feuille = Feuille
mapArbre f g (Noeud coul val a b) = Noeud (f coul) (g val) (mapArbre f g a) (mapArbre f g b)

-- Question 3 --
hauteur:: Arbre coul val -> Int
hauteur Feuille = 0
hauteur (Noeud _ _ a b) = 1 + (max (hauteur a) (hauteur b))


taille:: Arbre coul val -> Int
taille Feuille = 1
taille (Noeud _ _ a b) = 1 + (taille a) + (taille b)

-- Question 4 --
dimension ::   (Int -> Int -> Int) -> Int -> Arbre coul val -> Int
dimension _ neutre Feuille  = neutre
dimension f neutre (Noeud _ _ a b) = 1 + (f (dimension f neutre a) (dimension f neutre b))

hauteur' :: Arbre c v -> Int
hauteur' = dimension max 0

taille' :: Arbre c v -> Int
taille' = dimension (+) 1

-- Question 5 --
peigneGauche :: [(c,a)] -> Arbre c a
peigneGauche [] = Feuille
peigneGauche ((c,a):xs) = Noeud c a (peigneGauche xs) Feuille

-- Question 6 --
prop_hauteurPeigne xs = length xs == hauteur (peigneGauche xs)
prop_hauteurPeigne' xs = length xs == hauteur' (peigneGauche xs)
--verifie que la fonction hauteur donne un bon résultat.

-- Question 7 --
-- taille --
prop_taillePeigne xs = (length xs) * 2 + 1  == taille (peigneGauche xs)
prop_taillePeigne' xs = (length xs) * 2 + 1 == taille' (peigneGauche xs)
-- mapArbre --
prop_mapArbrePeigne xs = peigneGauche xs == mapArbre id id (peigneGauche xs)

-- Question 8 --
estComplet :: Arbre c a -> Bool
estComplet arbre = taille arbre == 2 ^(hauteur arbre+1) -1

-- Question 9 --
estComplet' :: Arbre c a -> Bool
estComplet' arbre = taille' arbre == 2 ^(hauteur' arbre+1) -1

-- Question 10 --
prop_peigneGaucheComplet xs = ((length xs == 0 || length xs == 1) && estComplet (peigneGauche xs)) || (not (estComplet (peigneGauche xs)))

-- Question 11 --
complet :: Int -> [(c,a)] -> Arbre c a
complet 0 [] = Feuille
complet 0 _ = error "Trop d'argument"
complet _ [] = error "Pas assez d'argument"
complet n l = Noeud c v (complet (n-1) lg) (complet (n-1) ld)
               where long = length l
                     (lg, (c,v):ld) = splitAt (long `div` 2) l

-- L'arbre complet de hauteur n a 2^n feuilles et 2^n -1 noeuds. Soit au total 2^(n+1) -1 feuilles et noeuds.
-- Il n'est pas raisonnable de construire des arbres complets de hauteur 20 ou plus.


-- Question 12 --
infinitsArguments :: a -> [a]
infinitsArguments = iterate id

-- Question 13 --
coupleUnicod :: [((), Char)]
coupleUnicod = [((),x) | x <- ['a'..]]

-- Question 14 --
aplatit :: Arbre c a -> [(c, a)]
aplatit Feuille = []
aplatit (Noeud coul val fg fd) = (aplatit fg) ++ [(coul,val)] ++ (aplatit fd)

--Test --
prop_aplatit_complet n = (n>0 && n<=17) ==> map snd (aplatit (complet n (take (2 ^n-1)(coupleUnicod))))  == take (2 ^n-1) (['a'..])

-- Question 15 --
element :: Eq a => a -> Arbre c a -> Bool
element _ Feuille = False
element n (Noeud coul val fg fd) | n==val = True
                                 | otherwise = (element n fg) || (element n fd)

prop_element_aplatit n e = (n>0 && n<=17) ==> (e `elem` (map snd (aplatit (complet n (take (2 ^n-1)(coupleUnicod)))))) == (e `elem` (take (2 ^n-1) (['a'..])))

-- Question 16 --
coulToString :: (Show a) => a -> String
coulToString c = (show c)

valToString :: (Show a) => a -> String
valToString v = (show v)

noeud :: (c -> String) -> (a -> String) -> (c,a) -> String
noeud cToS vToS (c,v) = (vToS v) ++ "[color=" ++ (cToS c) ++ ", fontcolor=" ++(cToS c) ++ "]"

-- Question 17 --
arcs :: Arbre c a -> [(a,a)]
arcs Feuille = []
arcs (Noeud _ v Feuille Feuille) = []
arcs (Noeud _ v fg@(Noeud _ vg _ _) Feuille) = [(v,vg)] ++ (arcs fg)
arcs (Noeud _ v Feuille fd@(Noeud _ vd _ _)) = [(v,vd)] ++ (arcs fd)
arcs (Noeud _ v fg@(Noeud _ vg _ _) fd@(Noeud _ vd _ _)) = [(v,vg)] ++ [(v,vd)] ++ (arcs fg) ++ (arcs fd)

-- Question 18 --
arc :: (a -> String) -> (a,a) -> String
arc f (v1,v2) = (f v1) ++ "->" ++ (f v2)

-- Question 19 --
dotise :: String -> (c -> String) -> (a -> String) -> Arbre c a -> String
dotise name cToS vToS a = "/* Entete */ \n" ++
                          "digraph \"" ++ name ++  "\" {\n " ++
                          "node [fontname=\"DejaVu-Sans\", shape=circle]\n\n" ++
                          "/* Liste des noeuds */ \n" ++
                          unlines (map (noeud cToS vToS)(aplatit a)) ++
                          "/* Liste des arcs */ \n" ++
                          unlines (map (arc vToS)(arcs a)) ++
                          "}"

-- Question 20 --
elementR :: (Eq a, Ord a) => (Arbre c a) -> a -> Bool
elementR Feuille _ = False
elementR (Noeud _ val fg fd) v | v==val = True
                               | v<val = elementR fg v
                               | otherwise = elementR fd v

-- Question 21 --
data Couleur = Rouge | Noir
  deriving (Show,Eq)

type ArbreRN a =  Arbre Couleur a

-- Question 22 --
equilibre :: ArbreRN a -> ArbreRN a
equilibre (Noeud _ z (Noeud Rouge y (Noeud Rouge x a b) c) d) = Noeud Rouge y (Noeud Noir x a b) (Noeud Noir z c d)
equilibre (Noeud _ z (Noeud Rouge x a (Noeud Rouge y b c)) d) = Noeud Rouge y (Noeud Noir x a b) (Noeud Noir z c d)
equilibre (Noeud _ x a (Noeud Rouge z (Noeud Rouge y b c) d)) = Noeud Rouge y (Noeud Noir x a b) (Noeud Noir z c d)
equilibre (Noeud _ x a (Noeud Rouge y b (Noeud Rouge z c d))) = Noeud Rouge y (Noeud Noir x a b) (Noeud Noir z c d)
equilibre arbre = arbre

-- Question 23 --
insertion_inter :: Ord a => a -> ArbreRN a ->  ArbreRN a
insertion_inter v Feuille = (Noeud Rouge v Feuille Feuille)
insertion_inter v n@(Noeud coul val fg fd) | v<val = equilibre(Noeud coul val (insertion_inter v fg) fd)
                                           | v>val = equilibre(Noeud coul val fg (insertion_inter v fd))
                                           | otherwise = n

colorieRacine :: ArbreRN a -> ArbreRN a
colorieRacine (Noeud _ v fg fd) = (Noeud Noir v fg fd)

insertion :: Ord a => a -> ArbreRN a ->  ArbreRN a
insertion v n = colorieRacine(insertion_inter v n)

-- Question 24 --
ajoutsuccessif :: Ord a => [a]-> Arbre Couleur a -> [Arbre Couleur a]
ajoutsuccessif [] a = [a]
ajoutsuccessif (x:xs) a = a:(ajoutsuccessif xs (insertion x a))


-- Un noeud rouge n’a pas de fils rouge
racineRougePasFilsRouge :: ArbreRN a -> Bool
racineRougePasFilsRouge Feuille = True
racineRougePasFilsRouge (Noeud Rouge _ (Noeud Rouge _ _ _) _) = False
racineRougePasFilsRouge (Noeud Rouge _ _ (Noeud Rouge _ _ _)) = False
racineRougePasFilsRouge (Noeud _ _ fg fd) = (racineRougePasFilsRouge fg) && (racineRougePasFilsRouge fd)

prop_ArbreRN_noeudRougePasFilsRouge xs n = (n>0 && n<=(length xs)) ==> racineRougePasFilsRouge((ajoutsuccessif xs Feuille)!!n) == True

-- Racine noir
racine :: ArbreRN a -> Couleur
racine (Noeud c _ _ _ ) = c

prop_ArbreRN_racineNoir xs n = (n>0 && n<=(length xs)) ==> racine((ajoutsuccessif xs Feuille)!!n) == Noir

-- Applatit --
suppDoublon :: (Eq a) => [a] -> [a]
suppDoublon [] = []
suppDoublon [x] = [x]
suppDoublon (x:y:xs) | x/=y = (x:suppDoublon(y:xs))
                     | otherwise = suppDoublon (y:xs)

prop_ArbreRN_aplatit_ordre xs = map snd(aplatit((ajoutsuccessif xs Feuille)!!(length xs))) == suppDoublon(sort(xs))

-- Question 25 --
couleurNR :: Couleur -> String
couleurNR Noir = "black"
couleurNR Rouge = "red"

arbresDot :: String -> [String]
arbresDot l = map(dotise "ArbreRN" couleurNR (\x -> [x])) (ajoutsuccessif l Feuille)

main = mapM_ ecrit arbres
    where ecrit a = do writeFile "arbre.dot" a
                       threadDelay 1000000
          arbres  = arbresDot "gcfxieqzrujlmdoywnbakhpvst"
