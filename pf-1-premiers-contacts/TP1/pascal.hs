module Exodeux where

-- Question 1 
alterne :: [a] -> [a]
alterne [] = []
alterne (x:[]) = [x]
alterne (x:xs:xss) = (x:(alterne xss))

-- Question 2 
combine :: (a -> b -> c) -> [a] -> [b] -> [c]
combine f [] ys = []
combine f xs [] = []
combine f (x:xs) (y:ys) = [f x y] ++ combine f xs ys

-- Question 3 
pasPascal :: [Integer] -> [Integer]
pasPascal [] = []
pasPascal (x:xs) = zipWith (+) (1:x:xs) (0:xs++[0])

-- Question 4
pascal :: [[Integer]]
pascal = iterate pasPascal [1]

