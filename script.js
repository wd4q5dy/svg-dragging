const canvas = document.getElementById('canvas');
const thing = document.getElementById('name');

const output = document.getElementById('console');

canvas.addEventListener('load', makeDraggable);

document.addEventListener('selectionchange', (e) => {
    output.innerText = getSelection();
});

function makeDraggable(e) {
    const svg = e.target;
    const container = svg.parentElement;

    container.addEventListener('mousedown', startDrag);
    container.addEventListener('mousemove', drag);
    container.addEventListener('mouseup', endDrag);
    container.addEventListener('mouseleave', endDrag);

    let selectedElement = null;
    let offset = {
        x: 0, y: 0
    };

    function getMousePosition(e) {
        const CTM = svg.getScreenCTM();
        return {
            x: (e.clientX - CTM.e) / CTM.a,
            y: (e.clientY - CTM.f) / CTM.d
        };
    }

    function isDraggable(elem) {
        return (elem.getAttribute('draggable') !== null);
    }

    function startDrag(e) {
        if (!isDraggable(e.target)) return;

        e.preventDefault();
        
        selectedElement = e.target;

        offset = getMousePosition(e);
        offset.x -= parseFloat(selectedElement.getAttribute("x"));
        offset.y -= parseFloat(selectedElement.getAttribute("y"));

    }

    function drag(e) {
        if (!selectedElement) return;

        e.preventDefault();

        const mPos = getMousePosition(e);

        selectedElement.setAttribute("x", mPos.x - offset.x);
        selectedElement.setAttribute("y", mPos.y - offset.y);

        thing.setAttribute("x", e.clientX - offset.x);
        thing.setAttribute("y", e.clientY - offset.y);
    }

    function endDrag(e) {
        if (!selectedElement) return;

        e.preventDefault();

        selectedElement = null;
    }
}