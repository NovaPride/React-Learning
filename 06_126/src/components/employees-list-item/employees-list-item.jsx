import "./employees-list-item.css"; 
  
const EmployeesListItem = (props) => {
  const {name, salary, increase, rise, onDelete, onToggleIncrease, onToggleRise} = props;
 
  return (
    <li className={"list-group-item d-flex justify-content-between" + (increase ? " increase" : "") + (rise ? " like" : "")}>
      <span className="list-group-item-label"  onClick={onToggleRise}>{name}</span>
      <input type="text" className="list-group-item-input" defaultValue={(salary ? salary : 1000) + "$"}/>
      <div className="d-flex justify-content-center align-items-center">
        <button type="button" className="btn-cookie btn-sm" onClick={onToggleIncrease}>
          <i className="fas fa-cookie"></i>
        </button>
        <button type="button" className="btn-trash btn-sm" onClick={onDelete}>
          <i className="fas fa-trash"></i>
        </button>
        <i className="fas fa-star"></i>
      </div>    
    </li> 
  );
}

export default EmployeesListItem;
