const PostSchema = {
    type: 'object',
    properties: {
        id: { type: 'number', },
        name: {
            type: 'string',
        },
        email: {
            type: 'string',
        },
        password: {
            type: 'string',
        }
    }
}
export default {
    openapi: '3.0.0',
    info: {
        title: 'My API',
        version: '1.0.0',
    },
    paths: {
        '/api': {
            get: {
                summary: 'Get all users',
                responses: {
                    200: {
                        description: 'OK',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        message: {
                                            type: 'string',
                                            example: 'success',
                                        },
                                        data: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                properties: {
                                                    id: {
                                                        type: 'integer',
                                                        example: 1,
                                                    },
                                                    name: {
                                                        type: 'string',
                                                        example: 'John Doe',
                                                    },
                                                    email: {
                                                        type: 'string',
                                                        example: 'john.doe@example.com',
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        '/api/users': {
            post: {
                summary: 'Create a new user',
                requestBody: {
                    content: {
                        'application/json': {
                            schema: PostSchema,
                            required: ['name', 'email', 'password'],
                        },
                    },
                },
            },
            responses: {
                201: {
                    description: 'Created',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    message: {
                                        type: 'string',
                                        example: 'success',
                                    },
                                    data: {
                                        type: 'object',
                                        properties: {
                                            id: { type: 'number', },
                                            name: {
                                                type: 'string',
                                            },
                                            email: {
                                                type: 'string',
                                            },
                                            password: {
                                                type: 'string',
                                            }
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
                400: {
                    description: 'Bad Request',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    error: {
                                        type: 'string',
                                    },
                                },
                            },
                        },
                    },
                },
            },
            get: {
                summary: 'Get all users',
                responses: {
                    200: {
                        description: 'OK',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        message: {
                                            type: 'string',
                                            example: 'success',
                                        },
                                        data: {
                                            type: 'array',
                                            items: {
                                                type: 'object',
                                                properties: {
                                                    id: {
                                                        type: 'integer',
                                                        example: 1,
                                                    },
                                                    name: {
                                                        type: 'string',
                                                        example: 'John Doe',
                                                    },
                                                    email: {
                                                        type: 'string',
                                                        example: 'john.doe@example.com',
                                                    },
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },

        '/api/user/{id}': {
            parameters: [
                {
                    name: 'id',
                    in: 'path',
                    required: true,
                    description: 'The ID of the user to update',
                    schema: {
                        type: 'integer',
                    },
                },
            ],
            put: {
                summary: 'Update a user by ID',
                requestBody: {
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    name: {
                                        type: 'string',
                                    },
                                    email: {
                                        type: 'string',
                                    },
                                },
                            },
                        },
                    },
                },
                responses: {
                    200: {
                        description: 'OK',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        message: {
                                            type: 'string',
                                            example: 'success',
                                        },
                                        data: {
                                            type: 'object',
                                            properties: {
                                                id: {
                                                    type: 'integer',
                                                    example: 1,
                                                },
                                                name: {
                                                    type: 'string',
                                                    example: 'John Doe',
                                                },
                                                email: {
                                                    type: 'string',
                                                    example: 'john.doe@example.com',
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                    404: {
                        description: 'Not Found',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        error: {
                                            type: 'string',
                                            example: 'User not found',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        '/api/user/{uid}': {
            parameters: [
                {
                    name: 'uid',
                    in: 'path',
                    required: true,
                    description: 'The ID of the user to delete',
                    schema: {
                        type: 'integer',
                    },
                },
            ],
            delete: {
                summary: 'Delete a user by ID',
                responses: {
                    204: {
                        description: 'No Content',
                    },
                    404: {
                        description: 'Not Found',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        error: {
                                            type: 'string',
                                            example: 'User not found',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    }
}