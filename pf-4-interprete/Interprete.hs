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

-- Question 13 --
data ValeurA = VLitteralA Litteral
            | VFonctionA (ValeurA -> ValeurA)


-- Question 14 --
instance Show ValeurA where
    show (VFonctionA _) = "λ"
    show (VLitteralA  (Entier x)) = show x
    show (VLitteralA  (Bool x)) = show x

type Environnement a = [(Nom, a)]

-- Question 15 --
interpreteA :: Environnement ValeurA -> Expression -> ValeurA
interpreteA _ (Lit x) = VLitteralA x
interpreteA env (Lam x v) = VFonctionA (\y -> interpreteA ((x,y):env) v)
interpreteA env (Var x) = fromJust(lookup x env)
interpreteA env (App x x') = f v
                        where (VFonctionA f) = interpreteA env x
                              v = interpreteA env x'

-- Question 16 --
negA :: ValeurA
negA = VFonctionA lambda
    where lambda (VLitteralA (Entier x)) = VLitteralA (Entier (-x))

-- Question 17 --
addA :: ValeurA
addA = VFonctionA lambda
      where lambda (VLitteralA (Entier x)) = VFonctionA lambda2
              where lambda2 (VLitteralA (Entier y)) = VLitteralA (Entier (x + y))


-- Question 18 --
releveBinOpEntierA :: (Integer -> Integer -> Integer) -> ValeurA
releveBinOpEntierA f = VFonctionA lambda
      where lambda (VLitteralA (Entier x)) = VFonctionA lambda2
              where lambda2 (VLitteralA (Entier y)) = VLitteralA (Entier (f x y))

envA :: Environnement ValeurA
envA = [ ("neg",   negA)
       , ("add",   releveBinOpEntierA (+))
       , ("soust", releveBinOpEntierA (-))
       , ("mult",  releveBinOpEntierA (*))
       , ("quot",  releveBinOpEntierA quot)
       , ("if", ifthenelseA) ]

-- Question 19 --
ifthenelseA :: ValeurA
ifthenelseA = VFonctionA lambda
      where lambda (VLitteralA (Bool True)) = VFonctionA lambda2
              where lambda2 (VLitteralA (Entier y)) = VFonctionA lambda3
                        where lambda3 (VLitteralA (Entier (z))) = (VLitteralA (Entier (y)))
            lambda (VLitteralA (Bool False)) = VFonctionA lambda4
              where lambda4 (VLitteralA (Entier _)) = VFonctionA lambda5
                        where lambda5 (VLitteralA (Entier y)) = VLitteralA (Entier (y))

-- Question 20 --
main :: IO ()
main = do putStr "minilang> "
          hFlush stdout
          b <- isEOF
          unless b $ do l <- getLine
                        print (interpreteA envA (ras l))
                        main

data ValeurB = VLitteralB Litteral
             | VFonctionB (ValeurB -> ErrValB)

type MsgErreur = String
type ErrValB   = Either MsgErreur ValeurB
-- Question 21 --
instance Show ValeurB where
  show (VFonctionB _) = "λ"
  show (VLitteralB  (Entier x)) = show x
  show (VLitteralB  (Bool x)) = show x

-- Question 22 --
interpreteB :: Environnement ValeurB -> Expression -> ErrValB
interpreteB _ (Lit x) = Right (VLitteralB x)
interpreteB env (Lam x v) = Right (VFonctionB (\y -> interpreteB ((x,y):env) v))
interpreteB env (Var x) = case lookup x env of
                          Nothing -> Left ("la variable " ++ x ++ " n'est pas definie")
                          y -> Right (fromJust y)
interpreteB env (App x x') = case interpreteB env x of
                                  m@(Left _) -> m
                                  Right (VLitteralB (Entier v)) -> Left ((show v) ++ " n'est pas une fonction, application impossible")
                                  Right (VLitteralB (Bool v)) -> Left ((show v) ++ " n'est pas une fonction, application impossible")
                                  Right (VFonctionB f) -> case interpreteB env x' of
                                                                  m@(Left _) -> m
                                                                  (Right v) -> f v

-- Question 23 --
addB :: ValeurB
addB = VFonctionB lambda
      where lambda (VLitteralB (Entier x)) = Right (VFonctionB lambda2)
              where lambda2 (VLitteralB (Entier y)) = Right (VLitteralB (Entier (x + y)))
                    lambda2 e = Left (show e ++ " n'est pas un entier")
            lambda e = Left (show e ++ " n'est pas un entier")

-- Question 24 --
quotB :: ValeurB
quotB = VFonctionB lambda
      where lambda (VLitteralB (Entier x)) = Right (VFonctionB lambda2)
              where lambda2 (VLitteralB (Entier 0)) = Left "division par zero"
                    lambda2 (VLitteralB (Entier y)) = Right (VLitteralB (Entier (x `quot` y)))
                    lambda2 e = Left (show e ++ " n'est pas un entier")
            lambda e = Left (show e ++ " n'est pas un entier")

data ValeurC = VLitteralC Litteral
             | VFonctionC (ValeurC -> OutValC)

type Trace   = String
type OutValC = (Trace, ValeurC)
-- Question 25 --
instance Show ValeurC where
  show (VFonctionC _) = "λ"
  show (VLitteralC  (Entier x)) = show x
  show (VLitteralC  (Bool x)) = show x

-- Question 26 --
interpreteC :: Environnement ValeurC -> Expression -> OutValC
interpreteC _ (Lit x) = ("", VLitteralC x)
interpreteC env (Lam x v) = ("", VFonctionC (\y -> interpreteC ((x,y):env) v))
interpreteC env (Var x) = ("", fromJust(lookup x env))
interpreteC env (App x x') = (sx ++ sx' ++ "." ++ sv, v)
                        where (sx, VFonctionC f) = interpreteC env x
                              (sx', x2) = interpreteC env x'
                              (sv, v) = f x2

-- Question 27 --
pingC :: ValeurC
pingC = VFonctionC (\x -> ("p",x))

data ValeurM m = VLitteralM Litteral
               | VFonctionM (ValeurM m -> m (ValeurM m))
-- Question 28 --
instance Show (ValeurM m) where
  show (VFonctionM _) = "λ"
  show (VLitteralM  (Entier x)) = show x
  show (VLitteralM  (Bool x)) = show x

data SimpleM v = S v
               deriving Show
-- Question 29 --
interpreteSimpleM :: Environnement (ValeurM SimpleM) -> Expression -> SimpleM (ValeurM SimpleM)
interpreteSimpleM _ (Lit x) = S (VLitteralM x)
interpreteSimpleM env (Lam x v) = S (VFonctionM (\y -> interpreteSimpleM ((x,y):env) v))
interpreteSimpleM env (Var x) = S (fromJust(lookup x env))
interpreteSimpleM env (App x x') = f v
                        where S (VFonctionM f) = interpreteSimpleM env x
                              S v = interpreteSimpleM env x'

-- Question 30 --
instance Functor SimpleM where
    fmap = liftM

instance Applicative SimpleM where
    pure  = S
    (<*>) = ap

instance Monad SimpleM where
    (S v) >>= f = f v

-- Question 31 --
interpreteM :: Monad m => Environnement (ValeurM m) -> Expression -> m (ValeurM m)
interpreteM _ (Lit x) = pure (VLitteralM x)
interpreteM env (Lam x v) = pure (VFonctionM (\y -> interpreteM ((x,y):env) v))
interpreteM env (Var x) = pure (fromJust(lookup x env))
interpreteM env (App x x') = do (VFonctionM f) <- interpreteM env x
                                v <- interpreteM env x'
                                f v

type InterpreteM m = Environnement (ValeurM m) -> Expression -> m (ValeurM m)

interpreteS :: InterpreteM SimpleM
interpreteS = interpreteM

data TraceM v = T (Trace, v)
              deriving Show
-- Question 33 --
instance Functor TraceM where
    fmap = liftM

instance Applicative TraceM where
    pure x = T ("", x)
    (<*>) = ap

instance Monad TraceM where
    (T(t,v)) >>= f = T(t ++ g, v')
                      where T(g, v') = f v


interpreteMT :: InterpreteM TraceM
interpreteMT = interpreteM

pingM :: ValeurM TraceM
pingM = VFonctionM (\v -> T ("p", v))

-- Question 34 --
interpreteMT' :: InterpreteM TraceM
interpreteMT' env (App x x') = T(sx ++ sx' ++ "." ++ sv, v)
                        where T(sx, VFonctionM f) = interpreteMT' env x
                              T(sx', x2) = interpreteMT' env x'
                              T(sv, v) = f x2
interpreteMT' env (Lam x v) = T("", VFonctionM (\y -> interpreteMT' ((x,y):env) v))
interpreteMT' env x = interpreteMT env x

data ErreurM v = Succes v
               | Erreur String
               deriving Show
-- Question 35 --
instance Functor ErreurM where
    fmap = liftM

instance Applicative ErreurM where
    pure = Succes
    (<*>) = ap

instance Monad ErreurM where
    fail = Erreur
    Succes e >>= f = f e
    Erreur e >>= _ = fail e

-- Question 36 --
interpreteE :: InterpreteM ErreurM
interpreteE _ (Lit x) = Succes (VLitteralM x)
interpreteE env (Lam x v) = Succes (VFonctionM (\y -> interpreteE ((x,y):env) v))
interpreteE env (Var x) = case lookup x env of
                          Nothing -> Erreur ("la variable " ++ x ++ " n'est pas definie")
                          y -> Succes (fromJust y)
interpreteE env (App x x') = case interpreteE env x of
                                  m@(Erreur _) -> m
                                  Succes (VLitteralM (Entier v)) -> Erreur ((show v) ++ " n'est pas une fonction, application impossible")
                                  Succes (VLitteralM (Bool v)) -> Erreur ((show v) ++ " n'est pas une fonction, application impossible")
                                  Succes (VFonctionM f) -> case interpreteE env x' of
                                                                  m@(Erreur _) -> m
                                                                  (Succes v) -> f v
