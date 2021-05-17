
import { document } from '../utils/dynamodbClient';
import { v4 as  uuidv4} from "uuid"
import * as dayjs from 'dayjs';
interface ICreateTodo{
  id: string;
  user_id: string;
  title: string;
  done: boolean;
  deadline: string;
}

export const handle = async (event) => {
  const { userid: user_id } = event.pathParameters;
  const { title, deadline} = JSON.parse(event.body) as ICreateTodo;
  
    document.put({
      TableName: "todos",
      Item: {
        id: uuidv4(),
        user_id,
        title,
        done: false,
        deadline: dayjs(deadline).format("DD/MM/YYYY")
      }
    }).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: "Todo added!",
    }),
    headers: {
      "Content-type": "application/json"
    }
  }
}