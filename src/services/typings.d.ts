declare namespace API {

  type LoginParams = {
    account?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type PostResult = {
    code?: number;
    data?: any;
    msg?: string;
  }

  type SignupParams = {
    account?: string;
    username?: string;
    phone?: string;
    email?: string;
    code?: string;
    password?: string;
  }

  type UserInfo = {
    account?: string;
    username?: string;
    phone?: string;
    email?: string;
    identity?: number;
    auth?: number;
  }

  // declare type Status = 'error' | 'process' | 'finish' | 'wait';
  type TableColumns = {
    key?: number;
    issueID?: number;
    issueTitle?: string;
    issueDescription?: string;
    category?: any;
    priority: number;
    remainingTime: number;
    estimatedTime: number;
    updatedTime: number;
    status: number;
    object?: string;
    failureType?: number;
    manufacturer?: string;
    picture?: string[];
    trackingNumber?: string;
    currentProcesser?: number;
    processDetails?: {
      stage?: number;
      submit?: {
        status?: Status;
        processerID?: number;
      };
      approval?: {
        status?: Status;
        processerID?: number;
        result?: string;
        comments?: string;
      };
      dispatch?: {
        status?: Status;
        processerID?: number;
        result?: string;
        comments?: string;
      };
      repairment?: {
        status?: Status;
        processerID?: number;
        result?: string;
        cause?: string;
        solution?: string;
        stage?: number;
      };
      acceptance?: {
        status?: Status;
        processerID?: number;
        rating?: number;
        comments?: string;
      };
    };
  };

  type ProcesserInfo = {
    processerID: number;
    processer: string;
    phoneNumber: string;
    updateTime: string;
  };
}
