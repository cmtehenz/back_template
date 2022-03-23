"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.swaggerDocument = void 0;

/* eslint-disable import/prefer-default-export */
const swaggerDocument = {
  swagger: '2.0',
  info: {
    description: 'Este arquivo documento o template de um backend de login.',
    version: '1.0.0',
    title: 'Template de backend',
    termsOfService: 'http://swagger.io/terms/',
    contact: {
      email: 'cmtehenz@gmail.com'
    },
    license: {
      name: 'Apache 2.0',
      url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
    }
  },
  host: 'template.swagger.io',
  basePath: '/v2',
  tags: [{
    name: 'Password',
    description: 'Reseta a senha do usuário',
    externalDocs: {
      description: 'Find out more',
      url: 'http://swagger.io'
    }
  }, {
    name: 'User',
    description: 'Ultiliza para cadastrar, excluir, alterar dados do usuário',
    externalDocs: {
      description: 'Find out more',
      url: 'http://swagger.io'
    }
  }],
  schemes: ['https'],
  paths: {
    '/password/forgot': {
      post: {
        tags: ['Password'],
        summary: 'Esqueceu a senha',
        description: 'Inicia o processo de resetar a senha ',
        operationId: 'forgotPassword',
        produces: ['application/json'],
        parameters: [{
          in: 'body',
          name: 'body',
          description: 'Envia email para usuario',
          required: true,
          schema: {
            $ref: '#/definitions/Password'
          }
        }],
        responses: {
          '204': {
            description: 'No Content!'
          },
          '400': {
            description: 'These parameters are required: email!'
          }
        }
      }
    },
    '/password/reset': {
      post: {
        tags: ['Password'],
        summary: 'Resetar a senha',
        description: 'Após usar a rota forgot o usuario recebe um token em seu email',
        operationId: 'resetPassword',
        produces: ['application/json'],
        parameters: [{
          name: 'body',
          in: 'body',
          required: true,
          schema: {
            $ref: '#/definitions/ResetPassword'
          }
        }],
        responses: {
          '204': {
            description: 'No Content!'
          },
          '400': {
            description: 'Bad Request',
            schema: {
              $ref: '#/definitions/ErrorToken'
            }
          }
        }
      }
    },
    '/users': {
      post: {
        tags: ['User'],
        summary: 'Registrar usuário',
        description: 'Cria um novo usuário para o sistema',
        operationId: 'createUser',
        produces: ['application/json'],
        parameters: [{
          name: 'body',
          in: 'body',
          required: true,
          schema: {
            $ref: '#/definitions/User'
          }
        }],
        responses: {
          '200': {
            description: 'Ok',
            schema: {
              $ref: '#/definitions/UserResponse'
            }
          },
          '400': {
            description: 'Bad Request',
            schema: {
              $ref: '#/definitions/ErrorUserEmail'
            }
          }
        }
      }
    },
    '/sessions': {
      post: {
        tags: ['User'],
        summary: 'Inicia a sessão do usuario',
        operationId: 'authenticate',
        produces: ['application/json'],
        parameters: [{
          name: 'body',
          in: 'body',
          required: true,
          schema: {
            $ref: '#/definitions/UserAuthenticate'
          }
        }],
        responses: {
          '200': {
            description: 'Ok',
            schema: {
              $ref: '#/definitions/UserResponse'
            }
          },
          '400': {
            description: 'Bad Request',
            schema: {
              $ref: '#/definitions/ErrorUserEmail'
            }
          }
        }
      }
    },
    '/profile/show': {
      get: {
        tags: ['User'],
        summary: 'Mostra dados do usuario logado',
        description: 'Mostra dados do usuario logado atraves de um token enviado como Bearer',
        operationId: 'profileShow',
        produces: ['application/json'],
        parameters: [{
          name: 'token',
          in: 'bearer',
          required: true,
          type: 'string',
          example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MDc0NTE4MjgsImV4cCI6MTYxMDEzMDIyOCwic3ViIjoiZGY5YjQ0OGUtOTUwMy00ZDNmLWI5MDAtNDlkYTBmOGEwMjkyIn0.-LCGB3MCKQYWTaQCepsy5lqz7aMDnvDQTCxc3wjt9TU'
        }]
      }
    },
    '/grade/totalGrade/{student}/{subject}': {
      get: {
        tags: ['grade'],
        summary: "Gets total grade's value",
        description: "Gets total grade's value, based on the student and the subject",
        operationId: 'getTotalGradeByStudentSubject',
        produces: ['application/json'],
        parameters: [{
          name: 'student',
          in: 'path',
          required: true,
          type: 'string'
        }, {
          name: 'subject',
          in: 'path',
          required: true,
          type: 'string'
        }],
        responses: {
          '200': {
            description: 'The sum of {student} in {subject} is: {totalGrade}'
          },
          '404': {
            description: 'These parameters are required: student, subject!'
          }
        }
      }
    },
    '/grade/meanGrade/{subject}/{type}': {
      get: {
        tags: ['grade'],
        summary: "Gets mean grade's value",
        description: "Gets mean grade's value, based on the subject and the type",
        operationId: 'getTotalGradeBySubjectType',
        produces: ['application/json'],
        parameters: [{
          name: 'subject',
          in: 'path',
          required: true,
          type: 'string'
        }, {
          name: 'type',
          in: 'path',
          required: true,
          type: 'string'
        }],
        responses: {
          '200': {
            description: 'The mean of {subject} in {type} is: {meanGrade}'
          },
          '404': {
            description: 'These parameters are required: subject, type!'
          }
        }
      }
    },
    '/grade/threeBestGrades/{subject}/{type}': {
      get: {
        tags: ['grade'],
        summary: "Gets best three grade's value",
        description: "Gets best three grade's value, based on the subject and the type",
        operationId: 'getThreeBestGradeBySubjectType',
        produces: ['application/json'],
        parameters: [{
          name: 'subject',
          in: 'path',
          required: true,
          type: 'string'
        }, {
          name: 'type',
          in: 'path',
          required: true,
          type: 'string'
        }],
        responses: {
          '200': {
            description: 'The mean of {subject} in {type} is: {meanGrade}'
          },
          '404': {
            description: 'These parameters are required: subject, type!'
          }
        }
      }
    },
    '/grade/delete/{id}': {
      delete: {
        tags: ['grade'],
        summary: 'Delete grade',
        description: "Deletes a grade, based on the grade's id",
        operationId: 'deleteGradeById',
        produces: ['application/json'],
        parameters: [{
          name: 'id',
          in: 'path',
          required: true,
          type: 'string'
        }],
        responses: {
          '200': {
            description: 'User deleted successfully!'
          },
          '400': {
            description: 'This id does not exist!'
          },
          '404': {
            description: 'The id is required!'
          }
        }
      }
    },
    '/grade/updateGrade/{id}': {
      patch: {
        tags: ['grade'],
        summary: 'Update a grade',
        description: "Updates a grade, based on the grade's id",
        operationId: 'updateGradeById',
        produces: ['application/json'],
        parameters: [{
          name: 'id',
          in: 'path',
          required: true,
          type: 'string'
        }, {
          in: 'body',
          name: 'body',
          description: 'Update a user object',
          required: true,
          schema: {
            $ref: '#/definitions/NewGrade'
          }
        }],
        responses: {
          '200': {
            description: 'Successful operation!',
            schema: {
              $ref: '#/definitions/Grade'
            }
          },
          '400': {
            description: 'This id does not exist!'
          },
          '404': {
            description: 'The id is required!'
          }
        }
      }
    }
  },
  definitions: {
    Password: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'johndue@email.com'
        }
      }
    },
    ResetPassword: {
      type: 'object',
      properties: {
        token: {
          type: 'string',
          example: '945e7c59-2fef-4446-90ba-68dc28d4cf46'
        },
        password: {
          type: 'string',
          example: 'secret'
        },
        password_confirmation: {
          type: 'string',
          example: 'secret'
        }
      }
    },
    ErrorToken: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'error'
        },
        message: {
          type: 'string',
          example: 'User token not found'
        }
      }
    },
    ErrorUserEmail: {
      type: 'object',
      properties: {
        status: {
          type: 'string',
          example: 'error'
        },
        message: {
          type: 'string',
          example: 'Email address already used.'
        }
      }
    },
    User: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          example: 'John Due'
        },
        email: {
          type: 'string',
          example: 'johndue@example.com'
        },
        password: {
          type: 'string',
          example: 'secret'
        }
      }
    },
    UserResponse: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          example: 'cc781bf0-4244-5f12-b8f2-6cbbfd519b4f'
        },
        name: {
          type: 'string',
          example: 'John Due'
        },
        email: {
          type: 'string',
          example: 'johndue@example.com'
        },
        avatar_url: {
          type: null,
          example: null
        },
        created_at: {
          type: 'date',
          example: '2020-12-08T21:23:44.180Z'
        },
        updated_at: {
          type: 'date',
          example: '2020-12-08T21:23:44.180Z'
        }
      }
    },
    UserAuthenticate: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          example: 'johndue@example.com'
        },
        password: {
          type: 'string',
          example: 'secret'
        }
      }
    },
    Grade: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          format: 'int64'
        },
        student: {
          type: 'string'
        },
        subject: {
          type: 'string'
        },
        type: {
          type: 'string'
        },
        value: {
          type: 'integer',
          format: 'int64'
        },
        timestamp: {
          type: 'string',
          format: 'date-time'
        }
      }
    },
    NewGrade: {
      type: 'object',
      properties: {
        student: {
          type: 'string'
        },
        subject: {
          type: 'string'
        },
        type: {
          type: 'string'
        },
        value: {
          type: 'integer',
          format: 'int64'
        }
      }
    }
  },
  externalDocs: {
    description: 'Find out more about Swagger',
    url: 'http://swagger.io'
  }
};
exports.swaggerDocument = swaggerDocument;