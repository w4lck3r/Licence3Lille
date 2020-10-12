module Exo where

-- Question 1 --
somme' :: (Num a, Enum a) => a -> a
somme' n = sum [1..n]

-- Question 3 --
sommeDeXaY :: Int -> Int -> Int
sommeDeXaY x y = sum[x..y]

sommeDeXaY' :: Int -> Int -> Int
sommeDeXaY' x y = if y < x then 0
                  else x + sommeDeXaY' (x+1) y
-- Question 4 :
somme :: [Int] -> Int 
somme [] = 0
somme (x:xs) = x + somme(xs)
 
-- Question 5 :
last :: [a] -> a
last (xs) = head(reverse((xs)))

init :: [a] -> [a]
init (xs) = reverse(tail(reverse((xs))))

-- Question 6 :
elementn :: [a] -> Int -> a
elementn (x:xs) 0 = x
elementn (x:xs) n = elementn xs (n-1)

deuxplus :: [a] -> [a] -> [a]
deuxplus xs [] = xs
deuxplus [] ys = ys 
deuxplus xs ys = head(xs) : deuxplus (tail(xs)) ys


concat' :: [[a]] -> [a]
concat' (x:[]) = x
concat' (x:xs) = concat'((deuxplus x (head(xs))):(tail(xs)) )

map' :: (a->a) -> [a] -> [a]
map' f (x:xs) = if null(xs) 
                  then [f(x)]
                else [f(x)] ++ map f (xs)

-- Question 7 :
-- x est fonction qui prend un entier n en paramètre et renvoie l'élement 
-- de l situé à l'indice n. (si n > length l, renvoie une erreur)

-- Question 8 :
lenghtlist :: [a] -> Int
lenghtlist [] = 0
lenghtlist (x:xs) = somme(map (\n -> 1) (x:xs))

-- Question 9 :
-- version récursive :
fonc :: (a -> a) -> a -> Int -> [a]
fonc f x n = take n (iterate (f) x)

--version standard : 
fonc' :: (Ord t1, Num t1) => (t2 -> t2) -> t2 -> t1 -> [t2]
fonc' f x n = if n <= 0
                  then []
              else [x] ++ fonc' f (f(x)) ((n-1))

-- Question 10 : 
listeConsecutif :: (Ord t1, Num t1, Num t2) => t1 -> [t2]
listeConsecutif x = fonc' (+1) 0 (x+1)