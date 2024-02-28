// import React, { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { ref, child, get } from 'firebase/database';
// import { database } from '../firebase';
// import CardMedia from '@mui/material/CardMedia';

// const PRODUCT_PATH = 'Products/';

// function Detail() {
//   const { productId } = useParams();
//   const navigate = useNavigate();
//   const [product, setProduct] = useState(null); // Corrected the variable name

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const dbRef = ref(database);
//         const snapshot = await get(child(dbRef, `${PRODUCT_PATH}${productId}`));
//         setProduct(snapshot.val()); // Corrected the function and variable name
//       } catch (error) {
//         console.error("Lỗi khi lấy dữ liệu:", error);
//       }
//     };

//     fetchData();
//   }, [productId]);

//   // Placeholder functions
//   const handleInputChange = (e) => {
//     // Implement your logic for input change
//   };

//   const handleClick = (file) => {
//     // Implement your logic for handling file input
//   };

//   const handleUpdate = () => {
//     // Implement your logic for updating the product
//   };

//   // Rendering the form
//   return (
//     <div>
//       {/* Check if product is available before rendering */}
//       {product && (
//         <>
//           <h2>Thông tin chi tiết: {product.ProductCode}</h2>
//           <form style={{ display: 'inline' }}>
//             <div>
//               <label>
//                 Hình ảnh
//                 <div style={{ display: 'flex' }}>
//                   {product.ProductImage.map((image, index) => (
//                     <CardMedia
//                       key={index}
//                       component="img"
//                       alt={image.id}
//                       height="200"
//                       sx={{ width: 200, marginRight: 1 }}
//                       image={image.url}
//                     />
//                   ))}
                
//                 </div>
//               </label>
//             </div>
//             <div>
//               <label>
//                 Tên sản phẩm:
//                 <input
//                   type="text"
//                   name="ProductName"
//                   value={product.ProductName ?? ''}
//                   onChange={handleInputChange}
//                 />
//               </label>
//             </div>
//             <div>
//               <label>
//                 Giá sản phẩm:
//                 <input
//                   type="text"
//                   name="ProductPrice"
//                   value={product.ProductPrice ?? ''}
//                   onChange={handleInputChange}
//                 />
//               </label>
//             </div>
//             <div>
//               <label>
//                 Giá Sales:
//                 <input
//                   type="text"
//                   name="ProductSales"
//                   value={product.ProductSales ?? ''}
//                   onChange={handleInputChange}
//                 />
//               </label>
//             </div>
//             <div>
//               <label>
//                 Description:
//                 <input
//                   type="text"
//                   name="Description"
//                   value={product?.Description ?? ''}
//                   onChange={handleInputChange}
//                 />
//               </label>
//             </div>
            
//           </form>
//         </>
//       )}
//     </div>
//   );
// }

// export default Detail;
