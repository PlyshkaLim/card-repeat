import React, {useContext} from 'react';
import {Link} from "react-router-dom";
import { CurrentListIdContext} from "../../App";


const Statistics: React.FC<any> = (props: any) => {
  const {CurrentListId} = useContext(CurrentListIdContext);
  const cardList = props.cardBase;

  const cardName = cardList[CurrentListId].name;
  const statistic = cardList[CurrentListId].statistic;

  return (
    <div>
      Статистика группы "{cardName}"
      <div>
        Всего вопросов {statistic.questionsCount}
        <br/>
        Отвечено правильно {statistic.correctAnswers}
        <br/>
        Отвечено неправильно {statistic.incorrectAnswers}
      </div>
      <Link to={'/'}>
        <button>К папкам</button>
      </Link>
    </div>
  )
}

export default Statistics;