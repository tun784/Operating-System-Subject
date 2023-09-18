#include <stdio.h>
#include <sys/types.h>
#include <unistd.h>

int main(){
    int pid;
    printf("hi" );
    pid = fork();
    fork();
    printf("Hello" );
    printf("Bye" );
    return 0;
}