import React, {useContext, useState} from 'react';
import './Card.css';
import cn from 'classnames';
import {Link} from "react-router-dom";
import { CurrentListIdContext} from "../../App";

const Card: React.FC<any> = (props: any) => {
  const {CurrentListId} = useContext(CurrentListIdContext);
  const cardList = props.cardBase;
  const currentList = cardList.filter((i: any) => i.id === CurrentListId)[0];
  let questions = currentList.questions;

  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [isQuestion, setIQuestion] = useState<boolean>(true);
  let currentQuestions = questions.filter((q: any) => q.date === 0);
  let questionNumber = Math.floor(Math.random() * currentQuestions.length);
  let idQuestion = 0;
  let question = {
    id: -1,
    question: '',
    answer: '',
    date: -1
  };
  if (currentQuestions.length === 0) {
    question = {
      id: -1,
      question: '',
      answer: '',
      date: -1
    };
  } else {
    idQuestion = currentQuestions[questionNumber].id;
    question = questions.filter((q: any) => q.id === idQuestion)[0];
  }

  const checkAnswer = () => {
    setIQuestion(false);
  }

  const handleChange = (event: any) => {
    setCurrentAnswer(event.target.value);
  }

  const answerCorrect = () => {
    currentList.statistic.correctAnswers += 1;
    questions.map((q: any) => q.id === idQuestion ? q.date += 2 : q.date)
    setIQuestion(true);
  }

  const answerIncorrect = () => {
    currentList.statistic.incorrectAnswers += 1;
    questions.map((q: any) => q.id === idQuestion ? q.date += 1 : q.date)
    setIQuestion(true);
  }

  const changeQuestion = () => {
    currentQuestions = questions.filter((q: any) => q.date === 0);
    questionNumber = Math.floor(Math.random() * currentQuestions.length);
    if (currentQuestions.length === 0) {
      question = {
        id: -1,
        question: '',
        answer: '',
        date: -1
      };
    } else {
      idQuestion = currentQuestions[questionNumber].id;
      question = questions.filter((q: any) => q.id === idQuestion)[0];
    }
  }

  return (
    <div className={'card'}>
      <div className={'card_content'}>
        <div className={'question'}>
          {question.id !== -1 ?
            <>{question.question}</>
            :
            <>Вы повторили все карточки!</>
          }
        </div>
        {isQuestion
          ?
          <>
            <input onChange={handleChange}/>
            <button className={cn('button', 'answ')} onClick={checkAnswer}>Ответить</button>
            <br/>
          </>
          :
          <>
            <div> {
              currentAnswer === ''
                ? <>Вы не дали ответа</>
                :
                <>Ваш ответ: {currentAnswer}</>
            }</div>
            <div>Правильный ответ: {question.answer}</div>
            <button className={cn('button', 'correct')} onClick={answerCorrect}>Мой ответ верный</button>
            <button className={cn('button', 'incorrect')} onClick={answerIncorrect}>Мой ответ неверный</button>
          </>
        }
        <div>
          <Link to={'/'}>
            <button>К папкам</button>
          </Link>
        </div>
      </div>
    </div>)
}

export default Card;