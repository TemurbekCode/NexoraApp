import { LANDING_URL } from "../config/appConfig";

export default function Logo() {
    return (
        <a className="logo" href={LANDING_URL} aria-label="Nexora home">
            Nexora
        </a>
    );
}