export class DuplicateUserEmailError extends Error {
  errorCode = 'U001';

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class StoreNotExistError extends Error {
  errorCode = 'U002';

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class MissionAlreadyActiveError extends Error {
  errorCode = 'M001';

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class MissionNotExistError extends Error {
  errorCode = 'M002';

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}
