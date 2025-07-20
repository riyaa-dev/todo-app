const express=require("express");
const router=express.Router();
const {
    getTodos,
    addTodo,
    deleteTodo,
    toggleTodo

}=require("../controller/todocontroller");
router.get("/",getTodos);
router.post("/",addTodo);
router.delete("/:id",deleteTodo);
router.patch("/:id/toggle",toggleTodo);

module.exports=router;