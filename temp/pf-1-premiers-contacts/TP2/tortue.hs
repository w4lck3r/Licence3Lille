-- Jouhri Toufik & Jarir yassine 

import Graphics.Gloss

type Symbole  = Char
type Mot      = [Symbole]
type Axiome   = Mot
type Regles   = Symbole -> Mot
type LSysteme = [Mot]
type EtatTortue = (Point, Float)
type Config = (EtatTortue -- État initial de la tortue
              ,Float      -- Longueur initiale d’un pas
              ,Float      -- Facteur d’échelle
              ,Float      -- Angle pour les rotations de la tortue
              ,[Symbole]) -- Liste des symboles compris par la tortue
type EtatDessin = (EtatTortue, Path)

-- Question 1
motSuivant :: Regles -> Mot -> Mot
motSuivant r [] = []
motSuivant r (x:xs) = (r x) ++ motSuivant r xs

motSuivant' :: Regles -> Mot -> Mot
motSuivant' r x = concatMap r x

motSuivant'' :: Regles -> Mot -> Mot
motSuivant'' r xs = [ res |  x <- xs,   res <-(r x)]


-- Question 2 

rVonKoch :: Regles
rVonKoch 'F' = "F-F++F-F"
rVonKoch '+' = "+"
rVonKoch '-' = "-"
rVonKoch _ = ""

-- Question 3 
lsysteme :: Axiome -> Regles -> LSysteme
lsysteme a r = iterate(motSuivant r) a

-- Question 4 
etatInitial :: Config -> EtatTortue
etatInitial (a,_,_,_,_) = a

longueurPas :: Config -> Float
longueurPas (_,a,_,_,_) = a

facteurEchelle :: Config -> Float
facteurEchelle (_,_,a,_,_) = a

angle :: Config -> Float
angle (_,_,_,a,_) = a

symbolesTortue :: Config -> [Symbole]
symbolesTortue (_,_,_,_,a) = a

-- Question 5 --
avance :: Config -> EtatTortue -> EtatTortue
avance c ((x,y),z) = ((x+longueurPas(c)*cos(z), y+longueurPas(c)*sin(z)), z)

-- Question 6 --
tourneAGauche :: Config -> EtatTortue -> EtatTortue
tourneAGauche c (x, z) = (x, z+angle(c))

tourneADroite :: Config -> EtatTortue -> EtatTortue
tourneADroite c (x, z) = (x, z-angle(c))

-- Question 7 --
filtreSymbolesTortue :: Config -> Mot -> Mot
filtreSymbolesTortue c xs = [x | x <- xs, x `elem` (symbolesTortue c) ]

-- Question 8 --
interpreteSymbole :: Config -> EtatDessin -> Symbole -> EtatDessin
interpreteSymbole c (e@(point, _), p) 'F' = let e2 = (avance c e) in (e2, point:p++[(fst (e2))])
interpreteSymbole c (e,p) '+' = let e2 = (tourneAGauche c e) in (e2, p)
interpreteSymbole c (e,p) '-' = let e2 = (tourneADroite c e) in (e2, p)
interpreteSymbole _ _ _ = error "wrong symbol"


-- Question 9 --
-- Il est plus efficace de faire l'ajout en tete, car sinon il faut parcourir
-- tout le tableau pour l'ajouter en queue, ce qui est plus couteux.

-- Question 10 --
-- motToDessin' :: Config -> EtatDessin -> Mot -> EtatDessin
-- motToDessin' c e [] = e
-- motToDessin' c e (x:xs) =  motToDessin c (interpreteSymbole c e x) xs

motToDessin :: Config -> EtatDessin -> Mot -> EtatDessin
motToDessin c e m = foldl (interpreteSymbole c) e m

interpreteMot c m = line (snd (motToDessin c (etatInit_c,[fst(etatInit_c)]) (filtreSymbolesTortue c m)))
                    where etatInit_c = etatInitial c

-- Question 11 --
lsystemeAnime :: LSysteme -> Config -> Float -> Picture
lsystemeAnime l (c1,c2,c3,c4,c5) instant = interpreteMot config mot
                          where mot = l !! (round instant `mod` 6)
                                config = (c1, c2*(c3^(round instant `mod` 6)),c3,c4,c5 )

-------------------------------MAIN------------------------------------
dessin :: Picture
dessin = interpreteMot (((-150,0),0),100,1,pi/3,"F+-") "F+F--F+F"

main :: IO ()
main = animate (InWindow "L-Systems" (1000, 1000) (0, 0)) black (color white.vonKoch2Anime)
------------------------------------------------------------------------

---------------------------- Main configs -------------------------------
vonKoch1 :: LSysteme
vonKoch1 = lsysteme "F" regles
    where regles 'F' = "F-F++F-F"
          regles  s  = [s]

vonKoch2 :: LSysteme
vonKoch2 = lsysteme "F++F++F++" regles
    where regles 'F' = "F-F++F-F"
          regles  s  = [s]

hilbert :: LSysteme
hilbert = lsysteme "X" regles
    where regles 'X' = "+YF-XFX-FY+"
          regles 'Y' = "-XF+YFY+FX-"
          regles  s  = [s]

dragon :: LSysteme
dragon = lsysteme "FX" regles
    where regles 'X' = "X+YF+"
          regles 'Y' = "-FX-Y"
          regles  s  = [s]


vonKoch1Anime :: Float -> Picture
vonKoch1Anime = lsystemeAnime vonKoch1 (((-400,-250), 0), 800, 1/3, pi/3, "F+-")

vonKoch2Anime :: Float -> Picture
vonKoch2Anime = lsystemeAnime vonKoch2 (((-400, -250), 0), 800, 1/3, pi/3, "F+-")

hilbertAnime :: Float -> Picture
hilbertAnime = lsystemeAnime hilbert (((-400, -400), 0), 800, 1/2, pi/2, "F+-")

dragonAnime :: Float -> Picture
dragonAnime = lsystemeAnime dragon (((0, 0), 0), 50, 1, pi/2, "F+-")

------------------------------------------------------------------------
