const AddTaskForm = (props) => {

  return (
    <div>
          <form onSubmit={props.submit}>

        <label>
            Task title:
            <input type="text" name="title" required onChange={(event) => props.change(event)} />
        </label>
        <br />
        <label>
            Due date:
            <input type="date" name="deadline" required onChange={(event) => props.change(event)}  />
        </label>
        <br />
        <label>
            Details:
            <input type="text" name="description" onChange={(event) => props.change(event)} />
        </label>
       
            
            
<label for="priorityValues">Priority:  </label>
<select name="priority" id="priorityValues" form="priorityForm" onChange={(event) => props.change(event)}>
  <option value="Low">Low</option>
  <option value="Medium">Medium</option>
  <option value="High">High</option>
</select>
 <br />
       
       
        <input type="submit" value="Submit"  onChange={(event) => props.change(event)}/>
        </form>
    </div>
  )
};

export default AddTaskForm;
