import { update_dom_index } from "./dom";

function setDragandDrop(task_dom, to_do_array, tasks_data)
{
    let old_list;
    task_dom.addEventListener('dragstart', () =>{
        task_dom.classList.add('dragging');
        old_list = task_dom.parentElement;
    })
    task_dom.addEventListener('dragend', () => {
        let drag_item = document.querySelector('.dragging');
        let new_list = drag_item.parentElement;
        let to_move = to_do_array[old_list.getAttribute('to_do_index')].splice(drag_item.getAttribute('index'), 1);
        update_dom_index(new_list);
        update_dom_index(old_list);
        to_do_array[new_list.getAttribute('to_do_index')].splice(drag_item.getAttribute('index'), 0, to_move[0]);
        task_dom.classList.remove('dragging');
        tasks_data = JSON.stringify(to_do_array);
        console.log(to_do_array);
    })
}

function get_drag_after_element(container, y) {
    const draggableElements = [...container.querySelectorAll('.task:not(.dragging)')];
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
        }, {offset: Number.NEGATIVE_INFINITY}).element;
};

export {setDragandDrop, get_drag_after_element}