#include <stdio.h>
#include <sys/types.h>
#include <unistd.h>

int main(){
    int pid;
    printf("hi" );
    pid = fork();
    if (pid == 0){
        fork();
        printf("Hello" );
    }
    else
        printf("Bye ");
    return 0;
}