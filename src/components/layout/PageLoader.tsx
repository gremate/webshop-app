import '../../styles/page-loader.scss';
import { useAppState } from '../../contexts/AppContext';

export default function PageLoader(): JSX.Element {
    const appState = useAppState();

    return (
        <>
            {appState.isLoading && (
                <div className="loader-container">
                    <div className="loader" />
                </div>
            )}
        </>
    );
}
