-- Jouhri Toufik / Jarrir Yassine
import Parser
import Data.Char
import Data.Maybe
import Control.Monad(liftM, ap, unless)
import System.IO

type Nom = String

data Expression = Lam Nom Expression
                | App Expression Expression
                | Var Nom
                | Lit Litteral
                deriving (Show,Eq)

data Litteral = Entier Integer
              | Bool   Bool
              deriving (Show,Eq)

-- Question 1 --
espacesP :: Parser ()
espacesP = do many (car ' ')
              pure ()

-- Question 2 --
nomP :: Parser Nom
nomP = do s <- some (carQuand isAlphaNum)
          espacesP
          pure s

-- Question 3 --
varP :: Parser Expression
varP = do s <- nomP
          pure (Var s)

-- Question 4 --
applique :: [Expression] -> Expression
applique [e] = e
applique (x:y:xs) = applique ((App x y):xs)

applique' :: [Expression] -> Expression
applique'= foldl1 App

-- Question 5 et 7 --
exprP :: Parser Expression
exprP = exprParentheseeP <|> nombreP <|> booleenP <|>lambdaP <|> varP

exprsP :: Parser Expression
exprsP = do s <- some exprP
            pure (applique' s)

-- Question 6 --
lambdaP :: Parser Expression
lambdaP = do car '\\' <|> car 'λ'
             espacesP
             s <- nomP
             espacesP
             chaine "->"
             espacesP
             s2 <- exprsP
             pure (Lam s s2)

-- Question 8 --
exprParentheseeP :: Parser Expression
exprParentheseeP = do car '('
                      s <- exprsP
                      car ')'
                      espacesP
                      pure s

-- Question 9 --
nombreP :: Parser Expression
nombreP = do s <- some (carQuand isDigit)
             espacesP
             pure (Lit (Entier (read s)))

-- Question 10 --
booleenP :: Parser Expression
booleenP = do s <- chaine "True" <|> chaine "False"
              espacesP
              pure (Lit (Bool (read s)))

-- Question 11 --
expressionP :: Parser Expression
expressionP = do espacesP
                 s <- exprsP
                 pure s

-- Question 12 --
ras :: String -> Expression
ras s =  case (runParser expressionP s) of
         Nothing -> error "Erreur d’analyse syntaxique"
         Just x -> fst x
