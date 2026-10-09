import { memo } from "react";

function Button({ href, variant = "primary", className = "", children, ...rest }) {
    const classes = `btn btn--${variant} ${className}`.trim();
    if (href) {
        return (
            <a className={classes} href={href} {...rest}>
                {children}
            </a>
        );
    }
    return (
        <button type="button" className={classes} {...rest}>
            {children}
        </button>
    );
}

export default memo(Button);