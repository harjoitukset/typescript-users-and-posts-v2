import { app } from "./routes";


const PORT = process.env.PORT || 3000;

/**
 * In case the root URL is accessed, redirect to the /api/v1/user route.
 * This makes it easier for you to open the correct endpoint 😅.
 */
app.get('/', (req, res) => {
    res.redirect('/api/v1/user');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
