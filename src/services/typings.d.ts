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
    character?: string;
    auth?: number;
  }

  // declare type Status = 'error' | 'process' | 'finish' | 'wait';
  type TableColumns = {
    key?: number;
    issueID?: number;
    issueTitle?: string;
    issueDescription?: string;
    category?: any;
    priority: string;
    remainingTime: number;
    estimatedTime: number;
    updatedTime: number;
    status: number;
    object?: string;
    failureType?: string;
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
        approach?: number
        result?: string;
        comments?: string;
      };
      post?: {
        status?: Status;
        processerID?: number;
        trackingNumber?: string;
        deliveryComp?: string;
        senderPhone?: string;
        sender?: string;
      }
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

  type TrackingInfo = {
      trackingNumber?: string,
      deliveryCompany?: string,
      shippingAddress?: string,
      senderPhone?: string,
      sender?: string
  }

  type UserTableColumnsType = {
    userid: number;
    name?: string;
    ID?: string;
    phoneNumber?: string;
    email?: string;
    character?: number;
  };

  type CharacterInfo = {
    charID: number;
    charName?: string;
    charDesc?: string;
    createUserID?: string;
    createUserPhone?: string;
    authGroup: string[];
  }
}

  