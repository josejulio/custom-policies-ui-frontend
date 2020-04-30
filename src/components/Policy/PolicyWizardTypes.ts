import * as React from 'react';
import * as Yup from 'yup';

import { WizardStep } from '@patternfly/react-core';
import { DeepPartial, DeepReadonly } from 'ts-essentials';
import { Policy } from '../../types/Policy';
import { Fact } from '../../types/Fact';

export type PartialPolicy = DeepPartial<Policy>;

export type WizardStepExtended = WizardStep & {
  validationSchema: Yup.Schema<unknown>;
  isValid?: (context: WizardContext, values: DeepReadonly<PartialPolicy>) => boolean;
  onNext?: (context: WizardContext, values: DeepReadonly<PartialPolicy>, goNext: () => void) => void;
};

export const AlwaysValid = Yup.object();

export enum WizardActionType {
  SAVE = 'CREATE',
  VALIDATE_CONDITION = 'VALIDATE_CONDITION',
  VALIDATE_NAME = 'VALIDATE_NAME',
  NONE = 'NONE'
}

export interface VerifyPolicyResponse {
    isValid: boolean;
    error?: string;
    policy?: PartialPolicy;
}

export interface CreatePolicyResponse {
    created: boolean;
    error?: string;
}

export interface WizardContext {
  isLoading: boolean;
  isFormValid: boolean;
  isValid?: boolean;
  triggerAction: (action: WizardActionType) => Promise<unknown>;
  verifyResponse: VerifyPolicyResponse;
  createResponse: CreatePolicyResponse;
  setVerifyResponse: (verifyResponse: VerifyPolicyResponse) => void;
  facts?: Fact[];
  setMaxStep: (maxStep: number) => void;
}

export const WizardContext = React.createContext<WizardContext>({
    isLoading: false,
    isFormValid: false,
    triggerAction: () => {
        throw Error('Action executed without WizardContext');
    },
    verifyResponse: {
        isValid: false
    },
    createResponse: {
        created: false
    },
    setVerifyResponse: () => {
        throw Error('setVerifyResponse executed without WizardContext');
    },
    setMaxStep: () => {
        throw Error('setMaxStep executed without a WizardContext');
    }
});
