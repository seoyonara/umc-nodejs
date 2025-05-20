import { StatusCodes } from 'http-status-codes';
import { bodyToMission, bodyToReview, bodyToUser } from '../dtos/user.dto.js';
import {
  getMissionList,
  getReviewList,
  getUserMissionList,
  getUserReviewList,
  patchMissionState,
  postMissions,
  postReviews,
  userSignUp,
} from '../services/user.services.js';

export const handleUserSignUp = async (req, res, next) => {
  /*
    #swagger.summary = '회원 가입 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: { type: "string" },
              name: { type: "string" },
              gender: { type: "string" },
              birth: { type: "string", format: "date" },
              address1: { type: "string" },
              address2: { type: "string" },
              phoneNumber: { type: "string" },
              preferences: { type: "array", items: { type: "number" } }
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "회원 가입 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  email: { type: "string" },
                  name: { type: "string" },
                  preferCategory: { type: "array", items: { type: "string" } }
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[500] = {
      description: "회원 가입 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "U001" },
                  reason: { type: "string" },
                  data: { type: "object" }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    };
  */
  console.log('회원가입을 요청했습니다!');
  console.log('body: ', req.body);

  const user = await userSignUp(bodyToUser(req.body));
  res.status(StatusCodes.OK).success(user);
};

export const handlePostReviews = async (req, res, next) => {
  /*
    #swagger.summary = '리뷰 작성 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              userid:{type:"number"},
              storeid:{type:"number"},
              content: { type: "string" },
              score:{type:"number"},
              
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "리뷰 작성 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                content: '낫배드',
                score: 3
              }
            }
          }
        }
      }
    };
    #swagger.responses[500] = {
     description: '리뷰 등록 실패 - 존재하지 않는 가게',
      schema: {
        resultType: 'FAIL',
        error: {
          errorCode: 'U002',
          reason: '존재하지 않는 가게입니다.',
          data: {
           userid: 3,
           storeid: 11,
           content: '맛배드',
           score: 3
          }
       },
       success: null
     }
   }
  */
  console.log('리뷰 작성을 요청했습니다!');
  console.log('body: ', req.body);

  const review = await postReviews(bodyToReview(req.body));
  res.status(StatusCodes.OK).success(review);
};

export const handlePostMissons = async (req, res, next) => {
  /*
  #swagger.summary = '미션 도전 API'

  #swagger.requestBody = {
    required: true,
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            userid: { type: "number", example: 7 },
            missionid: { type: "number", example: 1 }
          }
        }
      }
    }
  }

  #swagger.responses[200] = {
    description: "미션 도전 성공 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "SUCCESS" },
            error: { type: "object", nullable: true, example: null },
            success: {
              type: "object",
              properties: {
                userid: { type: "number", example: 7 },
                missionid: { type: "number", example: 1 },
                isclear: { type: "boolean", example: false }
              }
            }
          }
        }
      }
    }
  }

  #swagger.responses[500] = {
    description: "미션 도전 실패 응답",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "FAIL" },
            error: {
              type: "object",
              properties: {
                errorCode: { type: "string", example: "M001" },
                reason: { type: "string", example: "이미 도전 중인 미션입니다." },
                data: {
                  type: "object",
                  properties: {
                    userid: { type: "number", example: 8 },
                    missionid: { type: "number", example: 1 }
                  }
                }
              }
            },
            success: { type: "object", nullable: true, example: null }
          }
        }
      }
    }
  }
  */
  console.log('미션 도전을 요청했습니다!');
  console.log('body: ', req.body);

  const mission = await postMissions(bodyToMission(req.body));
  res.status(StatusCodes.OK).success(mission);
};

export const handleStoreReviewList = async (req, res, next) => {
  /*
    #swagger.summary = '가게별 리뷰 조회'

    #swagger.parameters['storeid'] = {
      in: 'path',
      description: '조회할 가게 ID',
      required: true,
      type: 'number',
      example: 1
    }

    #swagger.responses[200] = {
      description: "리뷰 목록 조회 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  reviews: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number", example: 3 },
                        content: { type: "string", example: "최고의 가게" },
                        user: {
                          type: "object",
                          properties: {
                            id: { type: "number", example: 4 },
                            name: { type: "string", example: "회원5" }
                          }
                        },
                        store: {
                          type: "object",
                          properties: {
                            name: { type: "string", example: "란주칼면" },
                            address: { type: "string", example: "명동" }
                          }
                        }
                      }
                    }
                  },
                  nextCursor: { type: "number", nullable: true, example: 5 }
                }
              }
            }
          }
        }
      }
    }
  */

  const storeId = parseInt(req.params.storeId);
  const cursor =
    typeof req.query.cursor === 'string' ? parseInt(req.query.cursor) : 0;

  const { reviews, nextCursor } = await getReviewList(storeId, cursor);

  res.status(StatusCodes.OK).success({
    reviews,
    nextCursor,
  });
};

export const handleUserReviewList = async (req, res, next) => {
  /**
  #swagger.summary = '사용자별 리뷰 조회'

  #swagger.parameters['userid'] = {
    in: 'path',
    description: '조회할 사용자 ID',
    required: true,
    type: 'number',
    example: 3
  }

  #swagger.responses[200] = {
    description: "리뷰 목록 조회 성공",
    content: {
      "application/json": {
        schema: {
          type: "object",
          properties: {
            resultType: { type: "string", example: "SUCCESS" },
            error: { type: "object", nullable: true, example: null },
            success: {
              type: "object",
              properties: {
                reviews: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      id: { type: "number", example: 1 },
                      content: { type: "string", example: "훠궈가 맛있어요" },
                      user: {
                        type: "object",
                        properties: {
                          id: { type: "number", example: 3 },
                          name: { type: "string", example: "회원3" }
                        }
                      },
                      store: {
                        type: "object",
                        properties: {
                          name: { type: "string", example: "하이디라오" },
                          address: { type: "string", example: "홍대" }
                        }
                      }
                    }
                  }
                },
                nextCursor: { type: "number", nullable: true, example: 5 }
              }
            }
          }
        }
      }
    }
  }
*/

  const userId = parseInt(req.params.userId);
  const cursor =
    typeof req.query.cursor === 'string' ? parseInt(req.query.cursor) : 0;

  const { reviews, nextCursor } = await getUserReviewList(userId, cursor);

  res.status(StatusCodes.OK).success({
    reviews,
    nextCursor,
  });
};

export const handleStoreMissionList = async (req, res, next) => {
  /*
    #swagger.tags = ['Mission']
    #swagger.summary = '가게별 미션 조회'
    #swagger.description = '특정 가게에 등록된 미션 목록을 조회합니다. (페이징 가능)'

    #swagger.parameters['storeid'] = {
      in: 'path',
      description: '조회할 가게 ID',
      required: true,
      type: 'number',
      example: 1
    }

    #swagger.responses[200] = {
      description: "미션 목록 조회 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  missions: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number", example: 1 },
                        store: {
                          type: "object",
                          properties: {
                            name: { type: "string", example: "하이디라오" },
                            address: { type: "string", example: "홍대" }
                          }
                        },
                        date: { type: "string", format: "date-time", example: "2025-05-30T00:00:00.000Z" },
                        point: { type: "number", example: 300 },
                        cost: { type: "number", example: 20000 }
                      }
                    }
                  },
                  nextCursor: { type: "number", nullable: true, example: 5 }
                }
              }
            }
          }
        }
      }
    }
    */

  const storeId = parseInt(req.params.storeId);
  const cursor =
    typeof req.query.cursor === 'string' ? parseInt(req.query.cursor) : 0;

  const { missions, nextCursor } = await getMissionList(storeId, cursor);

  res.status(StatusCodes.OK).success({
    missions,
    nextCursor,
  });
};

export const handleUserMissionList = async (req, res, next) => {
  /*
    #swagger.tags = ['Mission']
    #swagger.summary = '사용자별 미션 조회'
    #swagger.description = '특정 사용자가 도전 중인 미션 목록을 조회합니다. (페이징 가능)'

    #swagger.parameters['userId'] = {
      in: 'path',
      description: '조회할 사용자 ID',
      required: true,
      type: 'number',
      example: 3
    }

    #swagger.responses[200] = {
      description: "사용자 미션 목록 조회 성공",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  missions: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        id: { type: "number", example: 4 },
                        mission: {
                          type: "object",
                          properties: {
                            name: { type: "string", example: "하이디라오" },
                            address: { type: "string", example: "홍대" }
                          }
                        },
                        isClear: { type: "boolean", example: false }
                      }
                    }
                  },
                  nextCursor: { type: "number", nullable: true, example: 5 }
                }
              }
            }
          }
        }
      }
    }
  */

  const userId = parseInt(req.params.userId);
  const cursor =
    typeof req.query.cursor === 'string' ? parseInt(req.query.cursor) : 0;

  const { missions, nextCursor } = await getUserMissionList(userId, cursor);

  res.status(StatusCodes.OK).success({
    missions,
    nextCursor,
  });
};

export const handleMissionClear = async (req, res, next) => {
  /*
    #swagger.tags = ['Mission']
    #swagger.summary = '미션 클리어 처리'
    #swagger.description = '사용자가 도전 중인 미션을 클리어 처리합니다.'

    #swagger.parameters['userMissionId'] = {
      in: 'path',
      description: '사용자의 미션 고유 ID',
      required: true,
      type: 'number',
      example: 2
    }

    #swagger.responses[200] = {
      description: "미션 클리어 성공 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "SUCCESS" },
              error: { type: "object", nullable: true, example: null },
              success: {
                type: "object",
                properties: {
                  mission: {
                    type: "object",
                    properties: {
                      id: { type: "number", example: 2 },
                      mission: {
                        type: "object",
                        properties: {
                          name: { type: "string", example: "하이디라오" },
                          address: { type: "string", example: "홍대" }
                        }
                      },
                      isclear: { type: "boolean", example: true }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    #swagger.responses[500] = {
      description: "미션 클리어 실패 - 존재하지 않는 미션",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "M002" },
                  reason: { type: "string", example: "존재하지 않는 미션입니다!" },
                  data: { type: "object", nullable: true, example: null }
                }
              },
              success: { type: "object", nullable: true, example: null }
            }
          }
        }
      }
    }
  */

  const userMissionId = parseInt(req.params.userMissionId);
  const { mission } = await patchMissionState(userMissionId);

  res.status(StatusCodes.OK).success({
    mission,
  });
};
