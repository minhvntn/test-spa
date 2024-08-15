import React from "react";

const Ai12zComponent = () => {
  React.useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://unpkg.com/ai12z@latest/dist/esm/library.js";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <ai12z-cta autoSearch="true" placeholder="Enter your questiontes " className="ai12z-cta" data-key="4e650dddd641ccedf1ba7e39f11b3108b6c07dcdfadf275e07ad9d3991f56eca"></ai12z-cta>
      <style>
        {`
          ai12z-cta {
            --ai12z-primary-color: rgb(165 180 252);
            --ai12z-secondary-color: #64748b;
            --ai12z-font-size: 16px;
            --ai12z-font-color: rgb(51 65 85);
            --ai12z-font-mute: #64748b;
            --ai12z-border-color: rgba(59, 130, 246, 0.5);
            --ai12z-hover-button-color: rgb(165 180 252);
            --ai12z-hover-bg-color: rgb(249 250 251);
            --ai12z-bubble-background: rgb(241 245 249);
            --ai12z-feedback-selected: rgb(55 65 81);
            --ai12z-feedback-color: rgb(107 114 128);
            --ai12z-font-description: rgb(107 114 128);
            --ai12z-font-search-text: #111827;
            --ai12z-dialog-margin: 3rem 0 0 0;
          }
        `}
      </style>
    </div>
  );
};

export default Ai12zComponent;