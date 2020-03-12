import * as React from 'react';
import { useFormikContext } from 'formik';

import { PartialPolicy, WizardContext, WizardStepExtended } from '../PolicyWizardTypes';
import { Switch, FormText } from '../../Formik/Patternfly';
import { Split, SplitItem, Title } from '@patternfly/react-core';
import { PolicyFormSchema } from '../../../schemas/CreatePolicy/PolicySchema';
import { useContext } from 'react';
import { GlobalDangerColor100, GlobalBackgroundColorLight300 } from '../../../utils/PFColors';
import { ExclamationCircleIcon } from '@patternfly/react-icons';
import { style } from 'typestyle';
import { Messages } from '../../../properties/Messages';
import { Form } from '../../Formik/Patternfly/Form';
import { Conditions } from '../Table/ExpandedContent/Conditions';
import { Actions } from '../Table/ExpandedContent/Actions';
import { Action } from '../../../types/Policy/Actions';
import { padding } from 'csstips';

const exclamationClassName = style({
    marginRight: 5
});

const conditionsAndActionsBlockClassName = style({
    backgroundColor: GlobalBackgroundColorLight300,
    ...padding(18, 14),
    margin: 5
});

const ReviewStep: React.FunctionComponent = () => {
    const context = useContext(WizardContext);
    const { values } = useFormikContext<PartialPolicy>();

    return (
        <>
            <Form>
                <Title size="xl">{ Messages.wizards.policy.review.title }</Title>
                <Switch
                    isDisabled={ context.isLoading }
                    type="checkbox"
                    id="isEnabled"
                    name="isEnabled"
                    labelOn={ Messages.wizards.policy.review.policyIsActive }
                    labelOff={ Messages.wizards.policy.review.policyIsNotActive }
                    label={ Messages.wizards.policy.review.activateThisPolicy }
                />
                <Title size="md">{ Messages.wizards.policy.review.policy.details }</Title>
                <FormText label={ Messages.wizards.policy.review.policy.name } name="name" id="name"/>
                <FormText label={ Messages.wizards.policy.review.policy.description } name="description" id="description"/>
                <div className={ conditionsAndActionsBlockClassName }>
                    <Conditions conditions={ values.conditions }/>
                </div>
                <div className={ conditionsAndActionsBlockClassName }>
                    <Actions actions={ (values.actions || []) as Action[] } />
                </div>
                { context.createResponse.error && (
                    <Split>
                        <SplitItem>
                            <ExclamationCircleIcon className={ exclamationClassName } color={ GlobalDangerColor100 }/>
                        </SplitItem>
                        <SplitItem> { context.createResponse.error } </SplitItem>
                    </Split>
                ) }
            </Form>
        </>
    );
};

export const createReviewStep: (stepOverrides?: Partial<WizardStepExtended>) => WizardStepExtended = (stepOverrides) => ({
    name: Messages.wizards.policy.review.title,
    component: <ReviewStep/>,
    validationSchema: PolicyFormSchema,
    ...stepOverrides
});
