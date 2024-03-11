import React, { useState, useEffect } from "react";
import { ref, child, get, update } from "firebase/database";
import { auth, database, storage } from "../../../firebase";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardMedia from "@mui/material/CardMedia";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import { uploadBytes, getDownloadURL, ref as Ref } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

const FILE_PATH = "userAvarter";

function Profile() {
  const [img, setImg] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    storeName: "",
    address: "",
    tikiKey: "",
    lazadaKey: "",
    shoppeKey: "", // Fixed typo here
  });

  const dbRef = ref(database);
  const uid = auth.currentUser?.uid;

  const handleClick = async (file) => {
    try {
      setImg(file);
      const imgRef = Ref(storage, `${FILE_PATH}${uuidv4()}`);
      const snapshot = await uploadBytes(imgRef, file);
      const url = await getDownloadURL(snapshot.ref);
      setAvatar(url);
    } catch (error) {
      console.error("Lỗi khi tải lên hình ảnh:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (uid) {
          const snapshot = await get(child(dbRef, `users/${uid}`));
          if (snapshot.exists()) {
            setData(snapshot.val());
            setFormData({
              email: snapshot.val()?.email || "",
              password: snapshot.val()?.password || "",
              firstName: snapshot.val()?.firstName || "",
              lastName: snapshot.val()?.lastName || "",
              storeName: snapshot.val()?.storeName || "",
              address: snapshot.val()?.address || "",
              lazadaKey: snapshot.val()?.lazadaKey || "",
              shoppeKey: snapshot.val()?.shoppeKey || "",
              tikiKey: snapshot.val()?.tikiKey || "",
            });
          } else {
            console.log("Không có dữ liệu");
          }
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();

    return () => {
      // Cleanup function
    };
  }, [uid]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      if (uid) {
        await update(child(dbRef, `users/${uid}`), {
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          storeName: formData.storeName,
          address: formData.address,
          lazadaKey: formData.lazadaKey,
          shoppeKey: formData.shoppeKey, // Fixed typo here
          tikiKey: formData.tikiKey,
          image: avatar || data?.image,
        });
        NotificationManager.success(`Cập nhật thành công`, "Cập nhật", 3000);
      } else {
        console.error("Không có ID người dùng");
        NotificationManager.error("Không thành công", "Lỗi", 3000);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật người dùng:", error);
      NotificationManager.error("Không thành công", "Lỗi", 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#eff1f3", height: "100%", paddingTop: "40px" }}>
      <Stack>
        <NotificationContainer />
        <Typography variant="h6" pb={2}>
          Cài đặt thông tin
        </Typography>
        <Stack flexDirection={"row"}>
          <CardMedia
            component="img"
            alt="Hình ảnh mới"
            height="200"
            sx={{ width: 200, marginRight: 1 }}
            image={data?.image || avatar}
          />
          <Stack
            justifyContent={"center"}
            bgcolor={"white"}
            width={200}
            textAlign={"center"}
          >
            <label
              htmlFor="fileInput"
              style={{ cursor: "pointer", borderRadius: "4px" }}
            >
              <AddPhotoAlternateIcon style={{ fontSize: "80px" }} />
            </label>
            <input
              type="file"
              id="fileInput"
              onChange={(event) => handleClick(event.target.files[0])}
              accept="image/*"
              style={{ display: "none" }}
            />
          </Stack>
        </Stack>
      </Stack>

      <Box height={70} />

      <Stack>
        <Grid container spacing={2}>
          <Grid item xs={2}>
            StoreName:
          </Grid>
          <Grid item xs={10}>
            <input
              type="text"
              style={{
                height: "40px",
                flex: 1,
                width: "80%",
                paddingLeft: "10px",
              }}
              name="storeName"
              value={formData.storeName}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={2}>
            Address:
          </Grid>
          <Grid item xs={10}>
            <input
              type="text"
              style={{
                height: "40px",
                flex: 1,
                width: "80%",
                paddingLeft: "10px",
              }}
              name="address"
              value={formData.address}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={2}>
            Email:
          </Grid>
          <Grid item xs={10}>
            <input
              type="text"
              style={{
                height: "40px",
                flex: 1,
                width: "80%",
                paddingLeft: "10px",
              }}
              name="email"
              value={formData.email}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={2}>
            Password*:
          </Grid>
          <Grid item xs={10}>
            <input
              type="password"
              name="password"
              style={{
                height: "40px",
                flex: 1,
                width: "80%",
                paddingLeft: "10px",
              }}
              value={formData.password}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={2}>
            Lazada_Key*:
          </Grid>
          <Grid item xs={10}>
            <input
              type="password"
              name="lazadaKey"
              style={{
                height: "40px",
                flex: 1,
                width: "80%",
                paddingLeft: "10px",
              }}
              value={formData.lazadaKey}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={2}>
            Shoppe_Key*:
          </Grid>
          <Grid item xs={10}>
            <input
              type="password"
              name="shoppeKey"
              style={{
                height: "40px",
                flex: 1,
                width: "80%",
                paddingLeft: "10px",
              }}
              value={formData.shoppeKey}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={2}>
            Tiki_Key*:
          </Grid>
          <Grid item xs={10}>
            <input
              type="password"
              name="tikiKey"
              style={{
                height: "40px",
                flex: 1,
                width: "80%",
                paddingLeft: "10px",
              }}
              value={formData.tikiKey}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={2}>
            Name:
          </Grid>
          <Grid item xs={10} flexDirection={"row"}>
            <input
              type="text"
              name="firstName"
              style={{
                height: "40px",
                flex: 1,
                width: "40%",
                paddingLeft: "10px",
              }}
              value={formData.firstName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="lastName"
              style={{
                height: "40px",
                flex: 1,
                width: "40%",
                paddingLeft: "10px",
              }}
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>

        <Button
          style={{ marginTop: "20px" }}
          type="button"
          variant="outlined"
          onClick={handleUpdate}
        >
          Cập nhật sản phẩm
        </Button>
      </Stack>
    </div>
  );
}

export default Profile;
