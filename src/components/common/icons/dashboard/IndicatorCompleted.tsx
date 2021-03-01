import React from 'react';

interface Props {
  color?: string;
  width?: number | string;
  height?: number | string;
}

const IndicatorCompleted: React.FC<Props> = ({ color = '#8E85B7', width = '100%', height = '100%' }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24">
    <g fill="none" fillRule="evenodd">
      <g fill={color} fillRule="nonzero">
        <g>
          <g>
            <path d="M4.396 2.368C1.533 5.214 1.18 10.573 3.64 13.835l6.501 9.338 1.776-2.55c-.039-.124-.069-.252-.1-.38-.006-.026-.015-.053-.02-.08-.023-.098-.04-.195-.057-.294-.017-.094-.031-.19-.044-.284-.01-.073-.019-.145-.025-.22-.017-.18-.027-.36-.027-.541 0-.21.011-.415.031-.618.003-.025.009-.05.011-.074.02-.182.046-.36.082-.537l.004-.015c.365-1.78 1.502-3.268 3.058-4.114l.07-.037c.131-.069.264-.133.401-.193.06-.027.123-.054.184-.079.098-.039.197-.074.297-.108.102-.035.204-.07.309-.1.059-.016.12-.03.18-.045.143-.037.288-.07.436-.096l.067-.01c.18-.031.36-.054.545-.068 1.672-3.298 1.055-7.89-1.43-10.362C14.352.84 12.311 0 10.14 0c-2.17 0-4.21.841-5.745 2.368zm5.83 2.338c1.826 0 3.311 1.478 3.311 3.294s-1.485 3.294-3.312 3.294C8.4 11.294 6.914 9.816 6.914 8s1.485-3.294 3.311-3.294zm7.418 9.55c-.16.005-.317.018-.47.038-.153.02-.298.047-.44.08l-.079.02c-.114.028-.226.06-.336.095-.065.021-.13.046-.193.07-.068.026-.136.051-.203.08-.11.048-.218.1-.323.156l-.056.028c-1.46.8-2.453 2.352-2.453 4.132 0 .145.009.287.022.428.007.076.018.151.029.227.008.058.016.117.027.175.018.1.04.2.065.299l.02.08c.031.113.064.224.103.335.64 1.837 2.386 3.16 4.438 3.16 2.594 0 4.705-2.11 4.705-4.705 0-2.582-2.089-4.682-4.665-4.704l-.191.006zM20.24 16.4c.09.002.182.03.263.086.215.149.267.442.118.655l-2.94 4.202c-.076.108-.193.179-.323.197-.022.003-.044.005-.065.005-.109 0-.215-.039-.3-.108l-2.264-1.848c-.203-.165-.232-.462-.066-.663.166-.2.463-.23.665-.064l1.869 1.524 2.647-3.782c.075-.107.186-.175.305-.196.03-.006.06-.008.09-.008z" transform="translate(-36 -304) translate(16 280) translate(20 24)" />
          </g>
        </g>
      </g>
    </g>
  </svg>
);

export default IndicatorCompleted;