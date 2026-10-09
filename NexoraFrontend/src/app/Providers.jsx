import { SettingsProvider } from "../context/SettingsContext";
import { ToastProvider } from "../context/ToastContext";
import { DataProvider } from "../context/DataContext";
import { RangeProvider } from "../context/RangeContext";

export default function Providers({ children }) {
    return (
        <SettingsProvider>
            <ToastProvider>
                <DataProvider>
                    <RangeProvider>{children}</RangeProvider>
                </DataProvider>
            </ToastProvider>
        </SettingsProvider>
    );
}