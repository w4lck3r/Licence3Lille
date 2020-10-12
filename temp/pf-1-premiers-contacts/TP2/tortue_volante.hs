-- -- Jouhri Toufik & Jarir yassine 

import Graphics.Gloss
-- Question 12 et 13 --
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
type EtatDessin = ([EtatTortue], [Path])

motSuivant :: Regles -> Mot -> Mot
motSuivant r [] = []
motSuivant r (x:xs) = (r x) ++ motSuivant r xs

motSuivant' :: Regles -> Mot -> Mot
motSuivant' r x = concatMap r x

motSuivant'' :: Regles -> Mot -> Mot
motSuivant'' r xs = [ res |  x <- xs,   res <-(r x)]

rVonKoch :: Regles
rVonKoch 'F' = "F-F++F-F"
rVonKoch '+' = "+"
rVonKoch '-' = "-"
rVonKoch _ = ""

lsysteme :: Axiome -> Regles -> LSysteme
lsysteme a r = iterate(motSuivant r) a

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

avance :: Config -> EtatTortue -> EtatTortue
avance c ((x,y),z) = ((x+longueurPas(c)*cos(z), y+longueurPas(c)*sin(z)), z)

tourneAGauche :: Config -> EtatTortue -> EtatTortue
tourneAGauche c (x, z) = (x, z+angle(c))

tourneADroite :: Config -> EtatTortue -> EtatTortue
tourneADroite c (x, z) = (x, z-angle(c))

filtreSymbolesTortue :: Config -> Mot -> Mot
filtreSymbolesTortue c xs = [x | x <- xs, x `elem` (symbolesTortue c) ]

interpreteSymbole :: Config -> EtatDessin -> Symbole -> EtatDessin
interpreteSymbole c ((e:es),(p:ps)) 'F' = let e2 = (avance c e) in ((e2:es), (p ++ [fst e2]):ps)
interpreteSymbole c ((e:es),(p:ps)) '+' = let e2 = (tourneAGauche c e) in ((e2:es), (p ++ [fst e2]):ps)
interpreteSymbole c ((e:es),(p:ps)) '-' = let e2 = (tourneADroite c e) in ((e2:es), (p ++ [fst e2]):ps)
interpreteSymbole c ((e:es),ps) '[' = ((e:e:es), [fst e]:ps)
interpreteSymbole c ((_:e2:es),ps) ']' = (e2:es, [fst e2]:ps)
interpreteSymbole _ _ _ = error "wrong symbol"

motToDessin :: Config -> EtatDessin -> Mot -> EtatDessin
motToDessin c e m = foldl (interpreteSymbole c) e m

interpreteMot :: Config -> Mot -> Picture
interpreteMot c m = pictures (map line (snd(motToDessin c ([etatInit_c],[[fst(etatInit_c)]]) (filtreSymbolesTortue c m))))
                    where etatInit_c = etatInitial c

lsystemeAnime :: LSysteme -> Config -> Float -> Picture
lsystemeAnime l (c1,c2,c3,c4,c5) instant = interpreteMot config mot
                          where mot = l !! (round instant `mod` 8)
                                config = (c1, c2*(c3^(round instant `mod` 8)),c3,c4,c5 )

-------------------------------MAIN------------------------------------
dessin :: Picture
dessin = interpreteMot (((-150,0),0),100,1,pi/3,"F+-") "F+F--F+F"

main :: IO ()
main = animate (InWindow "L-Systems" (1000, 1000) (0, 0)) black (color white.brindilleAnime)
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

brindille :: LSysteme
brindille = lsysteme "F" regles
    where regles 'F' = "F[-F]F[+F]F"
          regles  s  = [s]

broussaille :: LSysteme
broussaille = lsysteme "F" regles
    where regles 'F' = "FF-[-F+F+F]+[+F-F-F]"
          regles  s  = [s]


vonKoch1Anime :: Float -> Picture
vonKoch1Anime = lsystemeAnime vonKoch1 (((-1000, 0), 0), 800, 1/3, pi/3, "F+-")

vonKoch2Anime :: Float -> Picture
vonKoch2Anime = lsystemeAnime vonKoch2 (((-400, -250), 0), 800, 1/3, pi/3, "F+-")

hilbertAnime :: Float -> Picture
hilbertAnime = lsystemeAnime hilbert (((-400, -400), 0), 800, 1/2, pi/2, "F+-")

dragonAnime :: Float -> Picture
dragonAnime = lsystemeAnime dragon (((0, 0), 0), 50, 1, pi/2, "F+-")

brindilleAnime :: Float -> Picture
brindilleAnime = lsystemeAnime brindille (((0, -400), pi/2), 800, 1/3, 25*pi/180, "F+-[]")

broussailleAnime :: Float -> Picture
broussailleAnime = lsystemeAnime broussaille (((0, -480), pi/2), 500, 2/5, 25*pi/180, "F+-[]")
------------------------------------------------------------------------
