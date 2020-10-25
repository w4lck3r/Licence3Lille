module Arbre where 
import Control.Concurrent (threadDelay)
import Data.Char
import Data.List

data Arbre color value = Feuille 
                        | Noeud {couleur :: color,
                                valeur :: value,
                                fg :: (Arbre color value),
                                fd :: (Arbre color value)}
                        deriving(Show,Eq)
                
mapArbre :: (a -> a) -> (b -> b) -> (Arbre a b) -> (Arbre a b)
mapArbre _ _ Feuille = Feuille
mapArbre fc fv (Noeud color value fg fd) = Noeud (fc color) (fv value) (mapArbre fc fv fg) (mapArbre fc fv fd)

-- question 3
-- hauteur

hauteur :: Arbre a b-> Int
hauteur Feuille = 0
hauteur (Noeud _ _ a b) = 1 + (max (hauteur a) (hauteur b) )

-- taille 

taille :: (Arbre a b) -> Int
taille Feuille = 1
taille (Noeud _ _ a b) = 1 + (taille a) + (taille b)

-- dimension 

dimension :: (Int -> Int -> Int) -> Int  -> Arbre a b -> Int
dimension _ interm Feuille                 = interm
dimension f interm (Noeud color value a b) = 1 + (f (dimension f interm a) (dimension f interm b))


-- Peigne

peigneGauche :: [(c,a)] -> Arbre c a
peigneGauche []         = Feuille
peigneGauche ((c,a):xs) = Noeud c a (peigneGauche xs) Feuille

-- question 6 
-- test arbre --

arbretest = Noeud "rouge" 10 (Noeud "vert" 9 Feuille Feuille) (Noeud "vert" 8 Feuille Feuille)
