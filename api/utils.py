
from rest_framework.response import Response
from .serializers import NoteSerializer
from .models import Note


def getAllNotes(request):
    notes = Note.objects.all().order_by('-updated')
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)


def postNote(request):
    data = request.data
    note = Note.objects.create(
        body=data.get('body')
    )
    serializer = NoteSerializer(note, many=False)
    return Response(serializer.data)


def getSingleNote(request, pk):
    notes = Note.objects.get(id=pk)
    serializer = NoteSerializer(notes, many=False)
    
    return Response(serializer.data)


def updateNote(request, pk):
    data = request.data
    note = Note.objects.get(id=pk)
    serializer = NoteSerializer(instance=note, data=data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)


def deleteNote(request, pk):
    note = Note.objects.get(id=pk)
    note.delete()
    return Response('Note was deleted.')

