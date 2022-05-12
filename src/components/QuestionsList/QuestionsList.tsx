import React, {useContext} from "react";
import {CurrentListIdContext} from "../../App";
import {Link} from "react-router-dom";
import './QuestionsList.css';
import cn from "classnames";

const QuestionsList: React.FC<any> = (props: any) => {
  const {CurrentListId} = useContext(CurrentListIdContext);
  const cardList = props.cardBase;
  const cardName = cardList[CurrentListId].name;

  return (
    <div className={cn('questions_list_wrapper')}>
      <div className={cn('questions_list')}>
        <div>
          Список вопросов в группе - {cardName}
        </div>
        <div>
          {cardList[CurrentListId].questions.map((item: any, id: any) =>
            <div key={id} className={cn('card_item')}>
              <div>
                {item.question}
              </div>
              <div>
                {item.answer}
              </div>
            </div>
          )}
        </div>
        <Link to={'/'}>
          <button>К папкам</button>
        </Link>
      </div>
    </div>
  )
}

export default QuestionsList;