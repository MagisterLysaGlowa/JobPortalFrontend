import React from "react";

interface Props {
  stage: number;
}

const StageCounter: React.FC<Props> = ({ stage }: Props) => {
  return (
    <div className="flex flex-row justify-center mt-8 items-center">
      {Array.from({ length: 6 }, (_, index) => (
        <React.Fragment key={`dot-bar-${index}`}>
          <div
            className={`w-6 h-6 rounded-full transition-colors duration-700 relative z-10 ${
              stage > index ? "bg-main-third" : "bg-main-dark"
            }`}
          ></div>
          {index < 5 && (
            <div
              className={`w-4 h-2 transition-colors duration-700 -mx-1 relative z-5 ${
                stage - 1 > index ? "bg-main-third" : "bg-main-dark"
              }`}
            ></div>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default StageCounter;
