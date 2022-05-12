import React, {useState} from "react";
import {Link} from "react-router-dom";
import cn from "classnames";
import './AddGroup.css';

const AddGroup: React.FC<any> = (props: any) => {
  const cardList = props.cardBase;
  const [currentGroupName, setCurrentGroupName] = useState<string>('');

  function handleChange(event: any) {
    setCurrentGroupName(event.target.value);
  }

  function addNewGroupName() {
    cardList.push(
      {
        id: 0,
        name: currentGroupName,
        questions: [],
        statistic: {
          questionsCount: 0,
          correctAnswers: 0,
          incorrectAnswers: 0
        }
      }
    );
    localStorage.setItem('CardBase', JSON.stringify(cardList));
    setCurrentGroupName('');
  }

  return (
    <div className={cn('add_group')}>
      <div className={cn('add_group_content')}>
      <span>
        Добавить новую группу
      </span>
        <input value={currentGroupName} onChange={handleChange}/>
        <button onClick={addNewGroupName}>Добавить</button>
        <Link to={'/'}>
          <button>К папкам</button>
        </Link>
      </div>
    </div>
  )
}

export default AddGroup;