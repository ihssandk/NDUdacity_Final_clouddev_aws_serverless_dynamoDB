import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'
import { DocumentClient } from 'aws-sdk/clients/dynamodb'
import { createLogger } from '../utils/logger'
import { TodoItem } from '../models/TodoItem'
// import { TodoUpdate } from '../models/TodoUpdate';

const XAWS = AWSXRay.captureAWS(AWS)

const logger = createLogger('TodosAccess')

export class TodoDataLayer {

    constructor(
      private readonly docClient: DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    //   private readonly s3 = new AWS.S3({ signatureVersion: 'v4' }),
      private readonly todosTable = process.env.TODOS_TABLE,
    //   private readonly bucketName = process.env.TODOS_S3_BUCKET,
    //   private readonly signedUrlExpiration = process.env.SIGNED_URL_EXPIRATION,
    //   private readonly todoIdIndex = process.env.TODOS_CREATED_AT_INDEX
      )
       {}

      async createTodoItem(todo: TodoItem): Promise<TodoItem> {
        await this.docClient.put({
          TableName: this.todosTable,
          Item: todo
        }).promise()
        logger.info("todo created" , todo)
        return todo
      }

    }