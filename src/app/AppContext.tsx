import * as React from 'react';
import { Rbac } from '@redhat-cloud-services/insights-common-typescript';
import { UserSettings } from '../types/UserSettings';

export interface AppContext {
    rbac: Rbac;
    userSettings: UserSettingsAppContext;
}

export interface UserSettingsAppContext {
    settings?: UserSettings;
    isSubscribedForNotifications: boolean;
    refresh: () => void;
}

export const AppContext = React.createContext<AppContext>({
    rbac: {
        canReadAll: false,
        canWriteAll: false
    },
    userSettings: {
        settings: undefined,
        isSubscribedForNotifications: false,
        refresh: () => {
            console.error('Using default refresh function');
        }
    }
});
