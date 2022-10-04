const NotFound = ({onNotFound}) => {
   return (
      <div> 
         <h1>Нет результатов</h1>
         <input type="btn" defaultValue="Вернуться на главную" onClick={() => onNotFound()}/>
      </div>
   )

}

export default NotFound