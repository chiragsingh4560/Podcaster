import bcrypt from "bcrypt";

async function updatePassword(newPassword) {
  try {
    // Generate salt and hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // console.log("New hashed password:", hashedPassword);
  } catch (error) {
    console.error("Error hashing password:", error);
  }
}

// Replace 'yourNewPassword' with the new password
updatePassword("cs12345");
