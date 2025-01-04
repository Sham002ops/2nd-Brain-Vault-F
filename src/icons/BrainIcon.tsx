import React from 'react'


    const BrainIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
      return (
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="#723ffd"
          stroke="#723ffd"
          {...props} // Allow passing additional props like `className` or `style`
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
          <g id="SVGRepo_iconCarrier">
            <defs>
              <style>
                {`.cls-1 {
                  fill: none;
                  stroke: #5046e4 ;
                  stroke-miterlimit: 10;
                  stroke-width: 1.91px;
                }`}
              </style>
            </defs>
            <g id="brain">
              <path
                className="cls-1"
                d="M12,4.36V20.59a1.92,1.92,0,0,1-1.91,1.91,1.93,1.93,0,0,1-1.91-1.91v0a2.45,2.45,0,0,1-.48,0,3.35,3.35,0,0,1-3.34-3.34,3.19,3.19,0,0,1,.08-.7A4.29,4.29,0,0,1,3.6,8.79,3.24,3.24,0,0,1,3.41,7.7,3.34,3.34,0,0,1,6.27,4.4v0a2.87,2.87,0,0,1,5.73,0Z"
              ></path>
              <path className="cls-1" d="M6.75,11.05a3.35,3.35,0,0,1,0-6.69"></path>
              <path className="cls-1" d="M8.18,13.91h0A3.82,3.82,0,0,1,12,17.73h0"></path>
              <path className="cls-1" d="M9.14,7.23h0A2.86,2.86,0,0,0,12,4.36h0"></path>
              <path
                className="cls-1"
                d="M12,4.36V20.59a1.92,1.92,0,0,0,1.91,1.91,1.93,1.93,0,0,0,1.91-1.91v0a2.45,2.45,0,0,0,.48,0,3.35,3.35,0,0,0,3.34-3.34,3.19,3.19,0,0,0-.08-.7,4.29,4.29,0,0,0,.84-7.76,3.24,3.24,0,0,0,.19-1.09,3.34,3.34,0,0,0-2.86-3.3v0a2.87,2.87,0,0,0-5.73,0Z"
              ></path>
              <path className="cls-1" d="M17.25,11.05a3.35,3.35,0,0,0,0-6.69"></path>
              <path className="cls-1" d="M15.82,13.91h0A3.82,3.82,0,0,0,12,17.73h0"></path>
              <path className="cls-1" d="M14.86,7.23h0A2.86,2.86,0,0,1,12,4.36h0"></path>
            </g>
          </g>
        </svg>
      );
    };
    
    export default BrainIcon;
    



// <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
//   <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
// </svg>
