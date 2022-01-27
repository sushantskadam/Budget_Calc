import React,{useState,useEffect} from "react";
import {
  Button,
  Row,
  Col,
  Modal,
  Form,
  Container,
  Table,
} from "react-bootstrap";

function FormDashboard() {
    const [budget, setBudget] = useState(0)
    const [totalbudget, setTotalBudget] = useState(0)
    const [expense, setExpense] = useState()
    const [totalexpense, setTotalExpense] = useState()
    const [expensetitle, setExpensetitle] = useState("")
const [table, setTable] = useState([])

useEffect(() => {
    const getTable = JSON.parse(localStorage.getItem("table"));
    const getTotalBudget = JSON.parse(localStorage.getItem("totalbudget"));
    const getTotalExpense = JSON.parse(localStorage.getItem("totalexpense"));

    if (getTable) {
      setTable(getTable);
      setTotalBudget(getTotalBudget)
      setTotalExpense(getTotalExpense)
    }
  }, []);

useEffect(() => {
    localStorage.setItem("table", JSON.stringify(table));
    // setTotalExpense(table.map(data=>(

    // )))
    localStorage.setItem("totalexpense", JSON.stringify(totalexpense));
    localStorage.setItem("totalbudget", JSON.stringify(totalbudget));
  }, [table]);

const addBudget=(e)=>{
    e.preventDefault()
    if(totalbudget){
        setTotalBudget(Number(budget)+Number(totalbudget))
    }
    else{
        setTotalBudget(budget)
    }
    document.getElementById("budgetForm").reset();
}

const addExpense=(e)=>{
    e.preventDefault()
    if(totalexpense){
        setTotalExpense(Number(expense)+Number(totalexpense))
    }
    else{

        setTotalExpense(expense)
    }
    setTable([
        { id: Date.now(), expensetitle: expensetitle, expense: expense },
        ...table,
      ]);
      console.log(table)
      document.getElementById("expenseForm").reset();
}
const tableDelete = (id) => {
    const updatedtable = table.filter((item) => item.id !== id );
    setTable(updatedtable);
    let totalexp= 0
    updatedtable.map((data)=>(
        totalexp = Number(totalexp) + Number(data.expense)
    ))
    setTotalExpense(totalexp)
    
  };
  return (
    <div>
      <br />
      <Container fluid="md">
        <Row>
          <Col sm={4}>
            <Form className="border border-success text-left" id="budgetForm">
              <Form.Group className="mb-3">
                <Form.Label>
                  <b>Please Enter Your Budget</b>
                </Form.Label>
                <Form.Control type="number" placeholder="Enter Your Budget"      onChange={(e) => setBudget(e.target.value)} />
              </Form.Group>

              <Button variant="primary" type="submit" onClick={addBudget}>
                Calculate
              </Button>
            </Form>
            <br />
            <Form className="border border-danger text-left" id="expenseForm">
              <Form.Group className="mb-3">
                <Form.Label>
                  <b>Please Enter Your Expense</b>
                </Form.Label>
                <Form.Control type="text" placeholder="Enter Your Expense"       onChange={(e) => setExpensetitle(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <b>Please Enter Expense Amount</b>
                </Form.Label>
                <Form.Control type="number" placeholder="Expense Amount"      onChange={(e) => setExpense(e.target.value)} />
              </Form.Group>

              <Button variant="primary" type="submit" onClick={addExpense}>
                Add Expense
              </Button>
            </Form>
          </Col>
          <Col sm={8}>
            <Row>
              <Col>
                <h3>BUDGET</h3>
                <i
                  class="fa fa-money fa-3x text-primary"
                  aria-hidden="true"
                ></i>
                <h2 className="text-success">$ {totalbudget}</h2>
              </Col>
              <Col>
                <h3>EXPENSES</h3>
                <i
                  class="fa fa-credit-card fa-3x text-primary"
                  aria-hidden="true"
                ></i>
                <h2 className="text-danger">$ {totalexpense}</h2>
              </Col>
              <Col>
                <h3>BALANCE</h3>
                <i class="fa fa-usd fa-3x text-primary" aria-hidden="true"></i>
                <h2 className="text-success">$ {totalbudget-totalexpense ? (totalbudget)-(totalexpense) :""}</h2>
              </Col>
            </Row>
            <br />
            <br />
            <Row>
              <Col>
                <Table>
                  <thead>
                    <tr>
                      <th>Expense Title</th>
                      <th>Expense Value</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                      {table.map((data)=>(
                          <tr id={data.id}>
                          <td>{data.expensetitle}</td>
                          <td>{data.expense}</td>
                          <td> <button
                    className="btn btn-danger fa fa-close"
                    onClick={() => tableDelete(data.id)}
                  ></button></td>
                        </tr>
                      ))}
                    
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default FormDashboard;
