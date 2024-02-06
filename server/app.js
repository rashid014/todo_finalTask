const express= require('express')
const app= express();
const db= require('../server/config/db')
const cors = require('cors');
const bodyParser = require('body-parser');
const port=4000;
const todoRoute=require('../server/route/todoRoutes')
const swaggerJSDoc=require('swagger-jsdoc')
const swaggerUi=require('swagger-ui-express')
app.use(cors());
app.use(bodyParser.json());



const options={
    definition:{
        openapi:'3.0.0',
        info:{
            title:'Node JS API Project for mongodb',
             version:'1.0.0'
        
        },
        servers:[
            {
              url:'http://localhost:4000'  
            }
        ]
    },
    apis:['./app.js']
}

const swaggerSpec=swaggerJSDoc(options)
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerSpec))

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The unique identifier for a todo item
 *         title:
 *           type: string
 *           description: The title of the todo item
 *         completed:
 *           type: boolean
 *           description: Indicates whether the todo item is completed
 */

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all todos
 *     description: Retrieve a list of all todos
 *     responses:
 *       '200':
 *         description: A successful response
 *         content:
 *           application/json:
 *             example:
 *               - id: "1"
 *                 title: "Example Todo 1"
 *                 completed: false
 *               - id: "2"
 *                 title: "Example Todo 2"
 *                 completed: true
 *
 *   post:
 *     summary: Add a new todo
 *     description: Add a new todo item to the list
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       '201':
 *         description: Todo created successfully
 *       '400':
 *         description: Bad request, invalid input
 *
 * /api/todos/{id}:
 *   put:
 *     summary: Update a todo
 *     description: Update the details of a specific todo item
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the todo item to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       '200':
 *         description: Todo updated successfully
 *       '400':
 *         description: Bad request, invalid input
 *       '404':
 *         description: Todo not found
 */



app.use('/api',todoRoute)
async function startApp() {
    try {
  
    db.connect()
      app.listen(port, () => {
        console.log(`Server is up and running at ${port}`);
      });
     
  
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
      process.exit(1);
    }
  }
  
  startApp()

module.exports = app;
