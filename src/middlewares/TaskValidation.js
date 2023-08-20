import TaskModel from "../model/TaskModel.js";
import { isPast } from "date-fns";

const TaskValidation = async (req, res, next) => {
  const { macaddress, type, title, description, when } = req.body;

  if (!macaddress)
    return res.status(400).json({ error: "Macaddress é obrigatório." });

  if (!type) return res.status(400).json({ error: "Tipo é obrigatório." });

  if (!title) return res.status(400).json({ error: "Título é obrigatório." });

  if (!description)
    return res.status(400).json({ error: "Descrição é obrigatório." });

  if (!when)
    return res.status(400).json({ error: "Data e hora são obrigatórios." });
  else {
    let exists;

    if (req.params.id) {
      console.log("chamou");
      exists = await TaskModel.findOne({
        _id: { $ne: req.params.id },
        when: { $eq: new Date(when) },
        macaddress: { $in: macaddress },
      });
    } else {
      if (isPast(new Date(when)))
        return res
          .status(400)
          .json({ error: "Escolha uma data e hora futura." });

      exists = await TaskModel.findOne({
        when: { $eq: new Date(when) },
        macaddress: { $in: macaddress },
      });
    }

    if (exists)
      return res
        .status(400)
        .json({ error: "Já existe uma tarefa nesse dia e horário." });
  }

  next();
};

export default TaskValidation;
