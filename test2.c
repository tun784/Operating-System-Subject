#include <stdio.h>
#include <sys/types.h>
#include <unistd.h>

int main(){
    int pid;
    printf("hi \n");
    pid = fork();
    if (pid == 0){
        fork();
        printf("Hello \n");
    }
    else
        printf("Bye \n");
    return 0;
}