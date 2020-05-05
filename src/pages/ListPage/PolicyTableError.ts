import { ExclamationCircleIcon, PlusCircleIcon } from '@patternfly/react-icons';
import { GlobalDangerColor200 } from '../../utils/PFColors';
import { EmptyStateSectionProps } from '../../components/Policy/EmptyState/Section';
import { Messages } from '../../properties/Messages';

export type Handlers = {
    clearAllFiltersAndTryAgain: () => void;
    refreshPage: () => void;
    tryAgain: () => void;
};

export const policyTableError = (
    handlers: Handlers,
    requestHasError?: boolean,
    httpCode?: number
): EmptyStateSectionProps | undefined => {
    if (requestHasError) {
        switch (httpCode) {
            case 404:
                return {
                    icon: PlusCircleIcon,
                    title: Messages.tables.policy.emptyState.notFound.title,
                    content: Messages.tables.policy.emptyState.notFound.content
                };
            case 401:
                return {
                    icon: ExclamationCircleIcon,
                    title: 'Refresh your browser',
                    content: 'Your session expired while using the application',
                    action: handlers.refreshPage,
                    actionLabel: 'Reload page'
                };
            case 500:
                return {
                    icon: ExclamationCircleIcon,
                    iconColor: GlobalDangerColor200,
                    title: 'Internal server error',
                    content: 'The server was unable to process the request, please try again.',
                    action: handlers.tryAgain,
                    actionLabel: 'Try again'
                };
            default:
                return {
                    icon: ExclamationCircleIcon,
                    iconColor: GlobalDangerColor200,
                    title: 'Unable to connect',
                    content: 'There was an error retrieving data. Check your connection and try again.',
                    action: handlers.tryAgain,
                    actionLabel: 'Try again'
                };
        }
    }

    return undefined;
};
