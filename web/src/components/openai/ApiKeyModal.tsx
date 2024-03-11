"use client";

import { useState, useEffect } from "react";
import { ApiKeyForm } from "./ApiKeyForm";
import { Modal } from "../Modal";
import { Divider, Text } from "@tremor/react";

export async function checkApiKey() {
  const response = await fetch("/api/manage/admin/genai-api-key/validate");
  if (!response.ok && (response.status === 404 || response.status === 400)) {
    const jsonResponse = await response.json();
    return jsonResponse.detail;
  }
  return null;
}

export const ApiKeyModal = () => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    checkApiKey().then((error) => {
      console.log(error);
      if (error) {
        setErrorMsg(error);
      }
    });
  }, []);

  if (!errorMsg) {
    return null;
  }

  return (
    <Modal
      title="LLM Key Setup"
      className="max-w-4xl"
      onOutsideClick={() => setErrorMsg(null)}
    >
      <div>
        <div>
          <div className="mb-2.5 text-base">
            Please provide a valid OpenAI API key below in order to start using
            Danswer Search or Danswer Chat.
            <br />
            <br />
            Or if you&apos;d rather look around first,{" "}
            <strong
              onClick={() => setErrorMsg(null)}
              className="text-link cursor-pointer"
            >
              skip this step
            </strong>
            .
          </div>

          <Divider />

          <ApiKeyForm
            handleResponse={(response) => {
              if (response.ok) {
                setErrorMsg(null);
              }
            }}
          />
        </div>
      </div>
    </Modal>
  );
};
// "use client";

// import { useState, useEffect } from "react";
// import { ApiKeyForm } from "./ApiKeyForm";
// import { Modal } from "../Modal";
// import { Divider, Text } from "@tremor/react";

// // 此函数可以保留，但在调用时将忽略其返回值
// export async function checkApiKey() {
//   const response = await fetch("/api/manage/admin/genai-api-key/validate");
//   if (!response.ok && (response.status === 404 || response.status === 400)) {
//     const jsonResponse = await response.json();
//     return jsonResponse.detail;
//   }
//   return null;
// }

// export const ApiKeyModal = () => {
//   // 使用 errorMsg 状态管理错误消息已不再必要，但如果要保留用于其他目的也可以
//   const [errorMsg, setErrorMsg] = useState<string | null>(null);

//   // 移除 useEffect 钩子，因为我们不再根据 checkApiKey 的结果显示错误消息
//   // 如果你想在组件加载时执行其他操作，可以保留 useEffect

//   // 这里直接忽略 checkApiKey 的结果，假设用户总是可以继续
//   useEffect(() => {
//     checkApiKey().then((error) => {
//       // 不管验证结果如何，都不显示错误消息
//       setErrorMsg(null); // 如果选择保留 setErrorMsg 用于其他用途
//     });
//   }, []);

//   return (
//     <Modal
//       title="LLM Key Setup"
//       className="max-w-4xl"
//       onOutsideClick={() => setErrorMsg(null)} // 可以保留，允许用户关闭模态并重置错误消息
//     >
//       <div>
//         <div>
//           <div className="mb-2.5 text-base">
//             Please provide a valid OpenAI API key below in order to start using
//             Danswer Search or Danswer Chat.
//             <br />
//             <br />
//             Or if you&apos;d rather look around first,{" "}
//             <strong
//               onClick={() => setErrorMsg(null)} // 保留这一操作，以便用户可以跳过
//               className="text-link cursor-pointer"
//             >
//               skip this step
//             </strong>
//             .
//           </div>

//           <Divider />

//           <ApiKeyForm
//             handleResponse={(response) => {
//               // 无论 API key 验证结果如何，都视为成功处理
//               setErrorMsg(null); // 即使 API key 验证失败，也不显示错误消息
//             }}
//           />
//         </div>
//       </div>
//     </Modal>
//   );
// };
