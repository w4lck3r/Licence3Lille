module Dragon where
-- Jouhri Toufik
-- Jarir Yassine
import Graphics.Gloss
    ( white, animate, Display(InWindow), Path, Picture(Line), Point )

-- Question 5 
pointAintercaler :: Point -> Point -> Point
pointAintercaler (x1,y1) (x2,y2) = ((x1+x2)/2+(y2-y1)/2, (y1+y2)/2+(x1-x2)/2)

-- Question 6

pasDragon :: Path -> Path
pasDragon [] = error "il faut au moins deux points pour le chemin de départ"
pasDragon [x1]= [x1]
pasDragon [x1,x2]= [x1, (pointAintercaler x1 x2), x2]
pasDragon (x1:x2:x3:xs)= (x1:(pointAintercaler x1 x2):x2:(pointAintercaler x3 x2):(pasDragon (x3:xs)))

-- Question 7

dragon :: Point -> Point -> [Path]
dragon x1 x2 = iterate pasDragon [x1,x2]

-- Question 8

dragonOrdre :: Point -> Point -> Int -> Path
dragonOrdre a b 0 = [a,b]
dragonOrdre a b n =  (take (n+1) (dragon a b)) !! n

-- Question 9
-- main

main :: IO ()
main = animate (InWindow "Dragon" (500, 500) (0, 0)) white (dragonAnimeOrdre (50,250) (450,250))

dragonAnime :: RealFrac a => Point -> Point -> a -> Picture
dragonAnime a b t = Line (dragonOrdre a b (round t `mod` 20))

dragonAnimeOrdre :: RealFrac a => Point -> Point -> a -> Picture
dragonAnimeOrdre a b t = Line ( dragonOrdre a b (round t `mod` 15))
