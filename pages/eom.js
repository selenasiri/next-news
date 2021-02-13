import styles from '../styles/EOM.module.css'
import { Toolbar } from '../components/toolbar'

export const EOM = ({employee}) => {
  return(
    <div className='page-container'>
      <Toolbar />
      <div className={styles.main}>
        <h1>Employee Of The Month</h1>
      </div>

      <div className={styles.employeeOfTheMonth}>
        <h3>{employee.name}</h3>
        <h6>{employee.position}</h6>
        <img src={employee.image} />
        <p>{employee.description}</p>
      </div>
    </div>
  )
};

// runs asyncronously on the server, then passed as a prop
export const getServerSideProps = async pageContext => {  
  const apiResponse = await fetch(
    'https://my-json-server.typicode.com/portexe/next-news/employeeOfTheMonth'
  );

  const employee = await apiResponse.json();

  return {
    props: {
      employee
    }
  }
}

export default EOM