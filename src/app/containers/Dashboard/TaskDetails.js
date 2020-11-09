import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { getTodo } from '../../actions/todosActions';



const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const createData = (task, date, scheduled_at, status) => {
  return { task, date, scheduled_at, status };
};

//This should come from the global state with redux
const rows = [
  createData('Coding', '10:30 pm', '29/09/2020', 'Not Started')
];


const Details = (props) => {
  const classes = useStyles();

  const [todo, setTodo] = useState(null);

  useEffect(() => {
    // console.log('props')
    // console.log(props)
    // console.log('props')
    props.getTodo(props.match.params.todo_id);
  },[props.match.params.todo_id]);

  useEffect(() => {
    if(props.todo){
      setTodo(props.todo)
    }
  },[props.todo]);

  return todo && (
    <div>
      <div>
        <Button style={{float: 'right'}} variant="contained" color="secondary" onClick={() => props.history.goBack()}>Back</Button>
      </div>
      <div>
        <TableContainer component={Paper}>
          <Table className={classes.table} size="small" aria-label="a dense table">
              <TableHead>
                <TableRow>
                  <TableCell>Task</TableCell>
                  <TableCell align="right">Date</TableCell>
                  <TableCell align="right">Time</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow key={todo.id}>
                  <TableCell component="th" scope="row">
                    {todo.task}
                  </TableCell>
                  <TableCell align="right">{todo.date}</TableCell>
                  <TableCell align="right">{todo.scheduled_at}</TableCell>
                  <TableCell align="right">{todo.status}</TableCell>
                </TableRow>
                {/* {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.date}</TableCell>
                    <TableCell align="right">{row.scheduled_at}</TableCell>
                    <TableCell align="right">{row.status}</TableCell>
                  </TableRow>
                ))} */}
              </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}

Details.propTypes = {
  getTodo: PropTypes.func.isRequired,
  todo: PropTypes.object
};

const mapStateToProps = state => ({
  todo: state.todos.item
});

export default connect(mapStateToProps, { getTodo })(Details);
