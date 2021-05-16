// import { getItem, setItem, removeItem } from '@/utils/storage'

// export default {
//   namespaced: true,
//   state: {
//     // 地址
//     adress: getItem('adress')|| [],
    
//   },
//   mutations: {
//     setAdress (state, data) {
//       state.adress.some(item => {
//         if (item.id == data.id) {
//           item = data
//         }
//       setItem('adress', state.adress)
//       })
//     },
//     insertAdress (state, data) {
//       if (data.isDefault) {
//         state.adress.some(item => {
//           if (item.isDefault) {
//             item.isDefault =false
//           }
//         })
//       }
//       state.adress.push(data)
//       setItem('adress',state.adress)
//     },
//     deleteAdress (state, id) {
//       state.adress = state.adress.filter(item => {
//         return item.id !== id
//       })
//       setItem('adress',state.adress)
//     }
//   }
// }
