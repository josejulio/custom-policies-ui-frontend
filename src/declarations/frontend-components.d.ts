declare module '@redhat-cloud-services/frontend-components' {
    export class PageHeader extends React.Component<{
        className?: string;
        children: React.ReactNode
    }> {

    }
    export class Main extends React.Component<{
        className?: string;
        params?: any;
        path?: string;
        children: React.ReactNode
    }> {

    }

    export class Section extends React.Component<{
        type?: string;
        className?: string;
        children: React.ReactNode
    }> {

    }

    export class PageHeaderTitle extends React.Component<{
        title: React.ReactNode
    }> {

    }

    export class Skeleton extends React.Component<{
        className?: string;
        size?: 'xs' | 'sm' | 'md' | 'lg';
        isDark?: boolean;
    }> {
    }

    export class Spinner extends React.Component<{
        className?: string;
        centered?: boolean;
    }> {
    }
}
